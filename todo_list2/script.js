// получение всех необходимых элементов
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
let listArray;


inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; // получение значения, введенного пользователем
  if(userEnteredValue.trim() != 0){ //если пользовательское значение - это не пробел
    addBtn.classList.add("active"); //активировать кнопку добавить
  }else{
    addBtn.classList.remove("active"); //деактивировать кнопку добавить
  }
}
showTasks();

addBtn.onclick = ()=>{ // функция, которая вызывается после нажатия пользователем кнопки добавить
  let userEnteredValue = inputBox.value; //получение значения, введенного пользователем
  let getLocalStorageData = localStorage.getItem("New Todo"); //сохранить в локальное хранилище
  if(getLocalStorageData == null){ // условие при котором в локальном хранилище пусто
    listArray = []; //создаем пустой массив
  }else{
    listArray = JSON.parse(getLocalStorageData);  //превращаем строку джейсон в объект
  }
  listArray.push(userEnteredValue); //добавление нового значения в массив
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //превращение объекта в джейсон строку
  showTasks();
  addBtn.classList.remove("active"); //деактивация кнопки добавить после добавления задачи
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //передача длины массива
  if(listArray.length > 0){ // условие при котором длина массива больше нуля
    deleteAllBtn.classList.add("active"); //активация кнопки удаления
  }else{
    deleteAllBtn.classList.remove("active"); //деактивация кнопки удаления
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //добавление новой строки в список
  inputBox.value = ""; //очищение поля ввода задач
}

// функция удаления задач
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //удаление строки списка
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

// функция удаления всех задач
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //взять локальную историю
  if(getLocalStorageData == null){ //если локальная история пуста
    listArray = []; //создание нового массива
  }else{
    listArray = JSON.parse(getLocalStorageData);  //превращение Джейсон строки в объект
    listArray = []; //создание нового массива
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //установить элемент в локальную историю
  showTasks();
}
