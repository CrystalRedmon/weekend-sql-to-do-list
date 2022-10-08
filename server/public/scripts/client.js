// const tasksRouter = require("../../routes/router.tasks");

console.log('I am in client');

let allTasks 

$(document).ready(onReady);



function onReady(){
//click listeners
    $('body').on('submit', onAddNewTask);

    $('body').on('click', '.deleteBtn', onDeleteTask);

    $('body').on('change', '.completed-task', onCompleteTask);

    getAllTasks();  

};

function onCompleteTask(){
   console.log($(this).data('id'));
   console.log($(this).data('complete'));

   let taskID = $(this).data('id')

   $.ajax({
    method:'PUT',
    url: `/tasks/${taskID}`,
   })
   .then(response=>{
        getAllTasks();
   })
   .catch(error=>{
        console.log('Change not made', error);
   });


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

        if(task.complete === false){

        $('#tableBody').append(`
                <tr>
                <td>${task.task}</td>

                <td>
                    <div  class="custom-control custom-switch">
                        <input type="checkbox" data-complete=${task.complete} class="completed-task custom-control-input" data-id=${task.id}>
                        <label class="custom-control-label" for="customSwitches"></label>
                    </div>
                </td>

                <td><button class=deleteBtn data-id=${task.id}> Delete </button></td>
                </tr>
                `)

        }else if (task.complete === true){
            $('#tableBody').append(`
            <tr>
            <td>${task.task}</td>

            <td>
            <div  class="custom-control custom-switch">
                <input type="checkbox" data-complete=${task.complete}class="custom-control-input" data-id=${task.id} checked>
            <label class="custom-control-label" for="customSwitch1"></label>
          </div>
            </td>

            <td><button class=deleteBtn data-id=${task.id}> Delete </button></td>
            </tr>
            `)

        }



        
    };

}


//<div data-id=${task.id} class="custom-control custom-switch">
//                     <input type="checkbox" data-complete${task.complete} =class="completed-task custom-control-input" id="customSwitches">
//                     <label class="custom-control-label" for="customSwitches"></label>
//                 </div>