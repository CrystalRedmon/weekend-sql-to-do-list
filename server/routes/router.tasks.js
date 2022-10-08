const { response } = require('express');
const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');



tasksRouter.get('/', (req, res)=>{
    
    pool.query(`SELECT * FROM "tasks";`)

    .then(dbRes=>{
        res.send(dbRes.rows);
    })
    .catch(error=>{
        console.log('Unable to get tasks from DB', error);
    });
    
});


tasksRouter.post('/', (req, res)=>{
    let newTask = req.body;
    console.log(newTask.task);
    

    let sqlText = `INSERT INTO "tasks" ("task",  "complete")
                    VALUES ($1, FALSE);`;

    const sqlParams = [newTask.task]

    pool.query(sqlText, sqlParams)
        .then(response=>{
            res.sendStatus(201);
        })
        .catch(error=>{
            console.log(`Add task failed`, error);
            res.send(500);
        });



});


tasksRouter.delete('/:id', (req, res)=>{

    console.log()

    let sqlText = `DELETE FROM "tasks"
                    WHERE "id" = $1;`;
    
    let sqlParams = [req.params.id];

    pool.query(sqlText, sqlParams)
        .then(response=>{
            res.sendStatus(200);
     })
        .catch(error=>{
        console.log('Delete failed', error);
    });

});



tasksRouter.put('/:id', (req, res)=>{
    console.log(req.params.id);

    let sqlText = `UPDATE "tasks" 
                    SET "complete" = NOT "complete"
                    WHERE "id" = $1;`;

    pool.query(sqlText, [req.params.id])    
        .then(response=>{
            res.sendStatus(200);
        }) 
        .catch(error=>{
            console.log('Change not made', error);
        });           

});
















module.exports = tasksRouter;