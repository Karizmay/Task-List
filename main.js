const hits = [
"Добавьте первую задачу",
"Введите задачу",
"Введите задачу в это поле"];

// Get tasks-list from local storage and print it on a web-page
let taskList = JSON.parse(localStorage.getItem("tasks"))||[];

//If localstorage not empty print task-list to a web-page
if (taskList.length > 0) {
   printTaskListFromLocalStorage ();
}

let date = new Date();
document.getElementById("date").innerText = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();

//If user press enter in input
document.getElementById("input-task").addEventListener("keydown", pressEnter);

//If user click AddTask-button
document.getElementById("add-task-button").addEventListener("click", AddTask);

//If user click ul
document.getElementById("task-list").addEventListener("click", clickUl);

/* Print task-list from localstorage to a web-page */
function printTaskListFromLocalStorage () {
   document.getElementById("input-task").placeholder = hits[1];
   document.getElementById("no-tasks").classList.add("hide");
   document.getElementById("input-task").classList.add("no-select");
   for (let i=0; i<taskList.length; i++)
   {
      CreateLi (taskList[i]);
   }
}

/* Create new li element in ul to user-task */
function CreateLi (task) {
   //Create li
   let li = document.createElement("li");

   //Create checkbox
   let check = document.createElement("input");
   check.className = "check";
   check.type = "checkbox";
   if (task.state == 'true')
   {
      check.checked = true;
   }
   li.append(check);

   //Create label
   let span = document.createElement("p");
   span.className = "task";
   span.innerHTML = task.taskName;
   if (check.checked) {
      span.classList.add('task-done');
   }
   li.append(span);

   //Creat delTask

   let delTask = document.createElement("label");
   delTask.className = "delTask";
   delTask.title = "Удалить задачу";
   delTask.innerHTML = "х";
   li.append(delTask);

   //Show new elements
   document.getElementById('task-list').insertBefore(li,document.getElementById('task-list').firstChild) ;
}

/* Add new user-task to ul */
function pressEnter(e)
{
   if (e.keyCode === 13) {
      AddTask ();
   }
};

/* Add user task from input to ul */
function AddTask (){

   //Get value from input
   let inputText = document.getElementById ('input-task').value;

   //if input is empty
   if (inputText=="")
   {
      document.getElementById ('input-task').value = null;
      document.getElementById ('input-task').placeholder = hits[2];
      document.getElementById ('input-task').classList.remove("no-select");
      return;
   }

   document.getElementById("no-tasks").classList.add("hide");
   document.getElementById("input-task").classList.add("no-select");

   //Add new task in array taskList
   taskList.push({'taskName':inputText,'state':'false'});

   document.getElementById("input-task").placeholder = hits[1];

   //Update localStorage
   localStorage.setItem("tasks", JSON.stringify(taskList));

   //Print new user task in a web-page
   CreateLi (taskList[taskList.length-1]);

   //Clear input
   document.getElementById ('input-task').value = null;
};

/* Delete task from localstore OR cross out task from ul */
function clickUl(e){

   //If click del-img-button delete this task from array
   if (e.target.className=='delTask')
   {
      if (!document.getElementById("input-task").classList.contains("no-select"))
      {
         document.getElementById("input-task").classList.add("no-select");
      }

      e.target.closest("li").remove();
      for (let i=0; i<taskList.length;i++)
      {
         if (taskList[i].taskName == e.target.previousElementSibling.innerHTML)
         {
            taskList.splice(i,1);
            break;
         }
      }
      document.getElementById("input-task").placeholder = hits[1];
      if (taskList.length==0) {
         document.getElementById("no-tasks").classList.remove("hide");
         document.getElementById("input-task").classList.remove("no-select");
         document.getElementById("input-task").placeholder = hits[0];
      }

   }

   //if user click checkbox, change state of this task in array and in a web-page
   if (e.target.className=='check')
   {
      e.target.nextElementSibling.classList.toggle('task-done');
      for (let i=0; i<taskList.length;i++)
      {
         if (taskList[i].taskName == e.target.nextElementSibling.innerHTML)
         {
            if (taskList[i].state == 'true')
            {
               taskList[i].state = 'false';
            }
            else
            {
               taskList[i].state = 'true';
            }
            break;
         }
      }
   }
   //Update localStorage
   localStorage.setItem("tasks", JSON.stringify(taskList));
};



