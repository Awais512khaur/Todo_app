document.getElementById('toggleButton').addEventListener('click', function() {
    var label = document.getElementById('label');
    label.style.display = (label.style.display === 'none' ? 'block' : 'none');
  });
window.addEventListener('load', () => 
{
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#newtaskinput');
    const list_el = document.querySelector('#tasks');
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    function getRandomColor()
     {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    function renderTasks()
     {
        list_el.innerHTML = "";
        tasks.forEach((task, index) =>
         {
            const task_el = document.createElement("div");
            task_el.classList.add("task");
            task_el.style.backgroundColor = getRandomColor();
            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");
            task_el.appendChild(task_content_el);
            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.type = "text";
            task_input_el.value = task;
            task_input_el.setAttribute("readonly", "readonly");
            task_content_el.appendChild(task_input_el);
            const task_action_el = document.createElement("div");
            task_action_el.classList.add("action");
            const task_update_el = document.createElement("button");
            task_update_el.classList.add("update");
            task_update_el.innerHTML = "Update";
            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "Delete";
            task_action_el.appendChild(task_update_el);
            task_action_el.appendChild(task_delete_el);
            task_el.appendChild(task_action_el);
            list_el.appendChild(task_el);
            task_update_el.addEventListener('click', () => 
            {
                if (task_update_el.innerText.toLowerCase() === "update")
                 {
                    task_input_el.removeAttribute("readonly");
                    task_input_el.focus();
                    task_update_el.innerText = "Save";
                } else 
                {
                    task_input_el.setAttribute("readonly", "readonly");
                    task_update_el.innerText = "Update";
                    tasks[index] = task_input_el.value;
                    saveTasks();
                }
            });
            task_delete_el.addEventListener('click', () => 
            {
                list_el.removeChild(task_el);
                tasks.splice(index, 1);
                saveTasks();
            });
        });
    }
    function saveTasks() 
    {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    form.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        const task = input.value;
        if (!task) 
        {
            alert("Please fill out the task");
            return;
        }
        tasks.push(task);
        saveTasks();
        renderTasks();
        input.value = "";
    });
    renderTasks();
});
