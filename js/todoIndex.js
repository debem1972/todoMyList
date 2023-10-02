//Chamando o video de ajuda
const chamaAjuda = document.querySelector('#callHelp');
const divAjuda = document.querySelector('.iframe');

chamaAjuda.addEventListener('click', function () {
    if (divAjuda.style.display === 'block') {
        divAjuda.style.display = 'none';
    } else {
        divAjuda.style.display = 'block';
        divAjuda.style.animation = "viewHelp 1s";
    }

    // Salvar no localStorage
    saveTasksToLocalStorage();
});


// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText == "") {
        window.alert("Não há nada para se anotar!");
        return;
    }


    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");

        li.innerHTML = `<span>${taskText}</span> 
        <i class="fa-solid fa-pen-to-square edit-icon" style="color: #1f5a29;"  onclick="editTask(this)"></i> 
        <i class="fa-solid fa-trash delete-icon" style="color: #1f5a29;"  onclick="deleteTask(this)"></i>`;
        taskList.appendChild(li);


        //Reproduzindo o som quando anotar algo(clicar na peninha)
        const audio1 = document.querySelector('#som1');
        audio1.play();



        // Limpar o campo de entrada
        taskInput.value = "";



        // Salvar no localStorage
        saveTasksToLocalStorage();
    }
}


//----------------------------------------------------


// Função para editar uma tarefa
function editTask(editIcon) {

    const li = editIcon.parentElement;
    const taskText = li.querySelector("span").innerText;
    const newText = prompt("Editar tarefa:", taskText);



    if (newText !== null) {
        li.querySelector("span").innerText = newText;

        //Reproduzir som ao clicar no icone editar
        const audio2 = document.querySelector('#som2');
        audio2.play();


        // Salvar no localStorage
        saveTasksToLocalStorage();
    }
}

//---------------------------------------------------------

// Função para excluir uma tarefa
function deleteTask(deleteIcon) {
    const li = deleteIcon.parentElement;
    li.remove();

    //Reproduzir som ao deletar
    const audio3 = document.querySelector('#som3');
    audio3.play();

    // Salvar no localStorage
    saveTasksToLocalStorage();
}

//-----------------------------------------------------

// Função para marcar/desmarcar como concluída
function toggleTaskDone(task) {
    const spanElement = task.querySelector("span");
    if (spanElement && event.target === spanElement) {
        spanElement.classList.toggle("task-done");
    }

    // Salvar no localStorage
    saveTasksToLocalStorage();
}


//-------------------------------------------------------

// Função para carregar tarefas do localStorage
function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const taskText of tasks) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span>
        <i class="fa-solid fa-pen-to-square edit-icon" style="color: #1f5a29;"  onclick="editTask(this)"></i> 
        <i class="fa-solid fa-trash delete-icon" style="color: #1f5a29;"  onclick="deleteTask(this)"></i>`;
        taskList.appendChild(li);

        li.addEventListener("click", function () {
            toggleTaskDone(this);
        });
    }
}

//----------------------------------------------------------

// Função para salvar tarefas no localStorage
function saveTasksToLocalStorage() {
    const taskListItems = document.querySelectorAll("#taskList li span");
    const tasks = Array.from(taskListItems).map(task => task.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar tarefas do localStorage ao carregar a página
loadTasksFromLocalStorage();


//----------------------------------------------------------
//ICONE DE EDITAR FONTAWESOME
//<i class="fa-solid fa-pen-to-square" style="color: #319041;"></i>

//ICONE DE DELETAR FONTAWESOME
//<i class="fa-solid fa-trash" style="color: #1f5a29;"></i>

//ICONE DE ANOTAR FONTAWESOME
//<i class="fa-solid fa-feather" style="color: #1f5a29;"></i>

//ICONE DE SALVAR FONTAWESOME
//<i class="fa-solid fa-floppy-disk" style="color: #1f5a29;"></i>

//ICONE DE BUSCAR FONTAWESOME
//<i class="fa-solid fa-magnifying-glass" style="color: #1f5a29;"></i>