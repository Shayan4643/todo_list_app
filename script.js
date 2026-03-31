const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const ul = document.querySelector("ul");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos() {
  ul.innerHTML = "";

  if (todos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "There are no todos yet!";
    ul.appendChild(li);
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = todo.text;

    span.addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      displayTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this todo?")) {
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
      }
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  todos.push({
    text: text,
    completed: false,
  });

  saveTodos();
  input.value = "";
  displayTodos();
});

displayTodos();
