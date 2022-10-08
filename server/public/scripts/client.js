console.log('I am in client');

$(document).ready(onReady);



function onReady(){
//click listeners

//call GET task function
    getAllTasks();
};


//function to get all tasks- GET
function getAllTasks(){

    let newTask = $('#inputForm').val();
    console.log(newTask);
    
    $.ajax({
        method:'GET',
        url: '/task'    
    })
    .then(response=> {
        render(response);
    })
    .catch(error=>{
        console.log('New task not added to list', error);
    });

};

//function to add task- POST



//function to delete task- DELETE


//function to complete task- PUT


//render function