// const tasksRouter = require("../../routes/router.tasks");

console.log('I am in client');

let allTasks 

$(document).ready(onReady);



function onReady(){
//click listeners
    $('body').on('submit', onAddNewTask);

    $('body').on('click', '.deleteBtn', onDeleteTask);
//call GET task function
    getAllTasks();


};


//function to get all tasks- GET
function getAllTasks(){

    $.ajax({
        method:'GET',
        url: '/tasks'
    })
    .then(response=> {
        allTasks = response;
        console.log(allTasks);
        render();
    })
    .catch(error=>{
        console.log('Unable to get tasks', error);
    });

};

//function to add task- POST
function onAddNewTask(evt){

    evt.preventDefault();

    //grab the input from the form 
    let newTask = {
        task: $('#inputForm').val()
    }
    
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then(response=>{
        console.log(response);
        getAllTasks();
    })
    .catch(error=>{
        console.log("Error, new task not added", error)
    })
}


//function to delete task- DELETE
function onDeleteTask(){

    //grab taskID from delete button
    let taskID = $(this).data('id')

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskID}`
    })
    .then(response=>{
        console.log('Task deleted.')
        getAllTasks();
    })
    .catch(error=>{
        console.log('Delete failed', error);
    });

};







//function to complete task- PUT


//render function

function render(){

    $('#tableBody').empty();

    for(let task of allTasks){
        $('#tableBody').append(`
        <tr>
        <td>${task.task}</td>
        <td>${task.complete}</td>
        <td><button class=deleteBtn data-id=${task.id}> Delete </button></td>
        </tr>
        `)
    };

}