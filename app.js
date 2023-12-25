const taskInput = document.getElementById('add-task');
const addButton = document.getElementById('add-button');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks'); 


//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement('li');
  //input (checkbox)
  const checkBox = document.createElement('input');
  //label
  const label = document.createElement('label');
  //input (text)
  const editInput = document.createElement('input');
  //button.edit
  const editButton = document.createElement('button');

  //button.delete
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'todo-section__task-item task-item';

  label.innerText = taskString;
  label.className = 'task-item__label label task';

  checkBox.type = 'checkbox';
  checkBox.className = 'task-item__input input input-checkbox';

  editInput.type = 'text';
  editInput.className = 'task-item__input input task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'task-item__button button edit';

  deleteButton.className = 'task-item__button button delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'task-item__delete-image';
  deleteButton.appendChild(deleteButtonImg);


  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



const addTask = function() {
  console.log('Add Task...');
  //Create a new list item with the text from the #add-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

//Edit an existing task.

const editTask = function() {
  console.log('Edit Task...');
  console.log('Change \'edit\' to \'save\'');

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('edit-mode');
  //If class of the parent is .editmode
  if (containsClass) {
  //switch to .editmode
  //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
}

//toggle .editmode on the parent.
  listItem.classList.toggle('edit-mode');
};


//Delete task.
const deleteTask = function() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
const taskCompleted = function() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  listItem.classList.remove('todo-section__task-item');
  listItem.classList.add('completed-section__task-item');
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function() {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  listItem.classList.remove('completed-section__task-item');
  listItem.classList.add('todo-section__task-item');
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.button.edit');
  const deleteButton = taskListItem.querySelector('.button.delete');


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.