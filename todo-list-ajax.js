const API_KEY = "todo-lists";

// Simulated AJAX fetch
function fetchTodos() {
  return new Promise(resolve => {
    const todos = JSON.parse(localStorage.getItem(API_KEY)) || [];
    resolve(todos);
  });
}

function saveTodos(todos) {
  return new Promise(resolve => {
    localStorage.setItem(API_KEY, JSON.stringify(todos));
    resolve();
  });
}

function renderTodos(todos) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => removeTodo(index);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById("todo-input");
  const value = input.value.trim();
  if (!value) return;

  fetchTodos().then(todos => {
    todos.push(value);
    saveTodos(todos).then(() => renderTodos(todos));
  });

  input.value = "";
}

function removeTodo(index) {
  fetchTodos().then(todos => {
    todos.splice(index, 1);
    saveTodos(todos).then(() => renderTodos(todos));
  });
}

// Initial load
fetchTodos().then(renderTodos);
