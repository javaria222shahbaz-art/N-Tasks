// ===============================
// Designed & Developed by Jia
// ===============================


// Selecting Elements

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");

const taskList = document.querySelector("#taskList");

const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const completedCount = document.querySelector("#completedCount");

const filterButtons = document.querySelectorAll(".filter-btn");

const emptyState = document.querySelector("#emptyState");

const greeting = document.querySelector("#greeting");
const dateElement = document.querySelector("#date");

const modeBtn = document.querySelector("#modeBtn");



// Store Tasks

let tasks = [];

let currentFilter = "all";



// ===============================
// Greeting + Date
// ===============================


function updateGreeting(){

    const hour = new Date().getHours();

    let message;


    if(hour < 12){

        message = " Good Morning, Jia";

    }
    else if(hour < 18){

        message = " Good Afternoon, Jia";

    }
    else{

        message = " Good Evening, Jia";

    }


    greeting.textContent = message;

}



function updateDate(){

    const today = new Date();


    const options = {

        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"

    };


    dateElement.textContent =
    today.toLocaleDateString("en-US", options);

}



updateGreeting();

updateDate();




// ===============================
// Add Task
// ===============================


function addTask(){


    const text = taskInput.value.trim();


    if(text === ""){

        taskInput.focus();

        return;

    }



    const task = {


        id: Date.now(),

        text:text,

        completed:false


    };



    tasks.push(task);



    taskInput.value = "";



    renderTasks();


}



// Button Click

addBtn.addEventListener(
"click",
addTask
);




// Enter Key

taskInput.addEventListener(
"keypress",
function(event){

    if(event.key === "Enter"){

        addTask();

    }

});






// ===============================
// Create Task Element
// ===============================


function createTaskElement(task){



    const taskBox = document.createElement("div");

    taskBox.classList.add("task");



    if(task.completed){

        taskBox.classList.add("completed");

    }




    const leftSide = document.createElement("div");

    leftSide.classList.add("task-left");





    const checkButton = document.createElement("button");

    checkButton.classList.add("check");



    if(task.completed){

        checkButton.textContent = "✓";

    }





    const text = document.createElement("p");

    text.classList.add("task-text");

    text.textContent = task.text;






    checkButton.addEventListener(
    "click",
    function(){


        task.completed = !task.completed;


        renderTasks();


    });







    leftSide.appendChild(checkButton);

    leftSide.appendChild(text);







    const deleteButton = document.createElement("button");


    deleteButton.classList.add("delete");


    deleteButton.textContent = "🗑";




    deleteButton.addEventListener(
    "click",
    function(){


        tasks = tasks.filter(
            function(item){

                return item.id !== task.id;

            }
        );



        renderTasks();


    });







    taskBox.appendChild(leftSide);

    taskBox.appendChild(deleteButton);



    return taskBox;



}







// ===============================
// Display Tasks
// ===============================


function renderTasks(){


    taskList.textContent = "";



    let filteredTasks = tasks.filter(
        function(task){


            if(currentFilter === "active"){

                return !task.completed;

            }


            if(currentFilter === "completed"){

                return task.completed;

            }


            return true;


        }
    );





    filteredTasks.forEach(
        function(task){


            const element =
            createTaskElement(task);


            taskList.appendChild(element);



        }
    );





    updateCounter();

    updateEmptyState();


}








// ===============================
// Counters
// ===============================


function updateCounter(){



    const total = tasks.length;


    const completed =
    tasks.filter(
        task => task.completed
    ).length;



    const active =
    total - completed;



    totalCount.textContent = total;


    activeCount.textContent = active;


    completedCount.textContent = completed;



}







// ===============================
// Empty State
// ===============================


function updateEmptyState(){



    if(tasks.length === 0){

        emptyState.style.display="block";

    }
    else{

        emptyState.style.display="none";

    }



}







// ===============================
// Filters
// ===============================


filterButtons.forEach(
function(button){


    button.addEventListener(
    "click",
    function(){



        filterButtons.forEach(
            btn => btn.classList.remove("active")
        );



        button.classList.add("active");



        currentFilter =
        button.dataset.filter;



        renderTasks();



    });



});







// ===============================
// Dark Mode
// ===============================


modeBtn.addEventListener(
"click",
function(){


    document.body.classList.toggle("dark");



    if(document.body.classList.contains("dark")){


        modeBtn.textContent="";


    }
    else{


        modeBtn.textContent="";


    }



});





// Initial Render

renderTasks();