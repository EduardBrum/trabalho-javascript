let arrayTarefas = [];

function adicionar() {
  const inputAdd = document.getElementById("input-add");
  const tarefa = inputAdd.value;
  if (!tarefa) {
    return;
  }

  const objTarefa = {
    id: Date.now().toString(),
    name: tarefa,
    status: "pending",
  };

  arrayTarefas.push(objTarefa);
  localStorage.setItem(
    "EduardBrum",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );

  console.log(arrayTarefas);
  atualizarDom(arrayTarefas);

}
function handleClick(e) {
  if (e.target.nodeName === "BUTTON") {
    if (e.target.classList.contains("remover")) {
      removerTarefa(e);
    } else if (e.target.classList.contains("finalizar")) {
      finalizarTarefa(e);
    }
  }
}

window.addEventListener("load", function () {
  if (sessionStorage.getItem("credentials") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "index.html";
}
  let armazenamento = localStorage.getItem("EduardBrum");
  if (armazenamento) {
armazenamento = JSON.parse(armazenamento);
arrayTarefas = armazenamento.tarefas;
atualizarDom(arrayTarefas);
  }    


  const divTarefa = document.getElementById("tarefas");
  const select = document.getElementById("select-filtro");
select.addEventListener("change", function atualizar() {
  atualizarDom(arrayTarefas);
});
  divTarefa.addEventListener("click", handleClick);
});


function atualizarDom(arrayTarefas) {
  const selectfiltro = document.getElementById("select-filtro"); //filtrar tarefas 
  let opcaoselecionada =selectfiltro.value;
  let arrayfiltrado = [];

  if (opcaoselecionada === "all") {
    arrayfiltrado = arrayTarefas;
  }
  else{
    arrayfiltrado = arrayTarefas.filter(function filtrar(item) {
      return item.status === opcaoselecionada;
    });
  }

  const todoList = document.getElementById("tarefas");
  todoList.innerHTML = "";
  for (let i = 0; i < arrayfiltrado.length; i++) {
    let divTarefa = document.createElement("div");
    divTarefa.className = arrayfiltrado[i].status + " todo";

    if (arrayfiltrado[i].status === "done") {
      divTarefa.classList.add("completed");
    }

    divTarefa.innerHTML = `<li class="todo-item">${arrayfiltrado[i].name}</li>
        <button id="finalizar-${arrayfiltrado[i].id}" class="finalizar check-btn"><i class="fas fa-check" aria-hidden="true"></i></button>
        <button id="remover-${arrayfiltrado[i].id}" class="remover trash-btn"><i class="fas fa-trash" aria-hidden="true"></i></button>`;

    todoList.appendChild(divTarefa);
  }
}

function removerTarefa(evento) {
  let confirmado = confirm("Deseja realmente remover a tarefa?");
  if (!confirmado) {
    return;
  }
  
  const id = evento.target.id;
  arrayTarefas = arrayTarefas.filter(function filtrar(item) {
    return item.id !== id.split("-")[1];
  });

  localStorage.setItem(
    "EduardBrum",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );

  atualizarDom(arrayTarefas);
  console.log(arrayTarefas);
}
function finalizarTarefa(evento) {
  const id = evento.target.id;
  const posicaoDaTarefaNoArray = arrayTarefas.findIndex(function encontrar(
    item
  ) {
    return item.id === id.split("-")[1];
  });
  arrayTarefas[posicaoDaTarefaNoArray].status = "done";

  localStorage.setItem(
    "EduardBrum",
    JSON.stringify({ info: { senha: "123" }, tarefas: arrayTarefas })
  );
  
  atualizarDom(arrayTarefas);
  console.log(arrayTarefas);
}


