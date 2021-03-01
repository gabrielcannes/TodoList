//Selectors
let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo')

//Event Listeners
//a arrow function do todoButton faz com que seja adicionada uma nova tarefa na lista de afazeres
todoButton.addEventListener('click',()=>{

 //Todo DIV
 let todoDiv = document.createElement('div');
 todoDiv.classList.add('todo');

 //Create LI
 let newTodo = document.createElement('li');
 newTodo.innerText = todoInput.value;
 newTodo.classList.add('todo-item');
 todoDiv.appendChild(newTodo);
//  newTodo.contentEditable='true';
//ADD Todo to LocalStorage
saveLocalTodos(todoInput.value);

 //checked button
 let completedButton = document.createElement('button');
 completedButton.innerHTML='<i class="fas fa-check"></i>';
 completedButton.classList.add('complete-btn');
 todoDiv.appendChild(completedButton);


 //delete button
 let trashButton = document.createElement('button');
 trashButton.innerHTML='<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);

 //pen button
//  let penButton = document.createElement('button');
//  penButton.innerHTML='<i class="fas fa-pen"></i>';
//  penButton.classList.add('pen-btn');
//  todoDiv.appendChild(penButton);


 //Append to list
 todoList.appendChild(todoDiv);

 //Clearing the value after clicking to add a new checklist
 todoInput.value='';
})

//a arrow function do todoList faz com que sejam deletadas funções erradas 
todoList.addEventListener('click',() =>{
let item = event.target;
//trash
if(item.classList[0]==='trash-btn'){
  let todo = item.parentElement;
  //animation
  todo.classList.add('fall');
  removeLocalTodos(todo);
  todo.addEventListener('transitionend', function(){
    todo.remove();
  })
}

//edit em desenvolvimento
// if(item.classList[0]==='pen-btn'){
//   let editbleTodo = document.querySelector('li');
//   editbleTodo.contentEditable='true'; 
// }

//complete
if(item.classList[0]==='complete-btn'){
  let todo = item.parentElement;
  todo.classList.toggle('completed');
}
})

document.addEventListener('DOMContentLoaded', getTodos);
filterOption.addEventListener('click', filterTodo);


//Functions
function filterTodo(e){
    let todos = todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        
        case 'all':
          todo.style.display = 'flex';
          break;
  
        case 'completed':
          if(todo.classList.contains('completed')){
            todo.style.display ='flex';
          }else{
            todo.style.display = 'none';
          }
          break;
  
        case 'uncompleted':
          if(todo.classList.contains('completed')){
            todo.style.display ='none';
          }else{
            todo.style.display = 'flex';
          }
          break;
        }
    })
}

function saveLocalTodos(todo){
  //Do i already have something in there?
  let todos
  if (localStorage.getItem('todos')===null){
    todos=[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
}

// function checkTodos(){
//   let todos
//   if (localStorage.getItem('todos')===null){
//     todos=[];
//   } else {
//     todos = JSON.parse(localStorage.getItem('todos'));
//   }
// }

function getTodos(){
  let todos
  if (localStorage.getItem('todos')===null){
    todos=[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){

//Todo DIV
 let todoDiv = document.createElement('div');
 todoDiv.classList.add('todo');

 //Create LI
 let newTodo = document.createElement('li');
 newTodo.innerText = todo;
 newTodo.classList.add('todo-item');
 todoDiv.appendChild(newTodo);
//  newTodo.contentEditable='true';
//ADD Todo to LocalStorage


 //checked button
 let completedButton = document.createElement('button');
 completedButton.innerHTML='<i class="fas fa-check"></i>';
 completedButton.classList.add('complete-btn');
 todoDiv.appendChild(completedButton);


 //delete button
 let trashButton = document.createElement('button');
 trashButton.innerHTML='<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);

 //pen button
//  let penButton = document.createElement('button');
//  penButton.innerHTML='<i class="fas fa-pen"></i>';
//  penButton.classList.add('pen-btn');
//  todoDiv.appendChild(penButton);


 //Append to list
 todoList.appendChild(todoDiv);

  })
}

function removeLocalTodos(todo){
  let todos
  if (localStorage.getItem('todos')===null){
    todos=[];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1); //qual posição tu quer remover do elemento e quantas tu quer remover?
  localStorage.setItem('todos',JSON.stringify(todos));
}