const taskList = document.getElementById("taskList");
const errorMsg= document.getElementById("errMsg")
const inputEL= document.getElementById("taskInput");
const inputBtnEl= document.getElementById("addTaskButton");


let taskArray= JSON.parse(localStorage.getItem("taskArray")) || []




const updateLocalStorage =()=>{
    localStorage.setItem("taskArray", JSON.stringify(taskArray))
}


const createTask=(taskText)=>{
    return{ text: taskText, compeleted: false}
}

function deleteTask(index) {
    taskArray.splice(index,1)
    updateLocalStorage()
}

function createTaskElement(taskObj) {
    const taskItem= document.createElement("li");
    taskItem.classList.add("taskItem");

    const checkbox= document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked= taskObj.compeleted;
    checkbox.addEventListener("change", function () {
        taskObj.compeleted=checkbox.checked;
        taskTextElement.classList.toggle("completed", taskObj.completed);
        updateLocalStorage();
    })


const taskTextElement = document.createElement("span")
taskTextElement.classList.add("taskText");
taskTextElement.textContent = taskObj.text;
taskTextElement.classList.toggle("completed", taskObj.completed)

const removeButton = document.createElement("button");
removeButton.classList.add("removeButton");
removeButton.textContent= "X";
removeButton.addEventListener("click", function () {
    deleteTask(taskObj);
    renderTasks();
});

taskItem.appendChild(checkbox);
taskItem.appendChild(taskTextElement);
taskItem.appendChild(removeButton);

return taskItem;

}

function renderTasks() {

    taskList.innerHTML=""

    for (let i = 0; i < taskArray.length; i++) {
        const taskElement = createTaskElement(taskArray[i]);
        taskList.appendChild(taskElement)
        
    }
    
}

inputBtnEl.addEventListener("click",function () {
    let removedWhiteSpace= inputEL.value.trim()

    if (removedWhiteSpace==="") {

        errorMsg.textContent="Please enter a new task."
        
    }else{
        errorMsg.textContent=""
        const newTask = createTask(removedWhiteSpace)
        taskArray.push(newTask)
        updateLocalStorage()
        inputEL.value =""
        renderTasks()
    }

} )

renderTasks()