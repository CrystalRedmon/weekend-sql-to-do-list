const bodyParser = require('body-parser');
const express =require('express');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//GET STATIC FILES
app.use(express.static('server/public'));

//TASKS ROUTE
const tasksRouter = require('./routes/router.tasks');
app.use('/tasks', tasksRouter);






















app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});