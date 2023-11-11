document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.getElementById("btnLogin");
    const btnCadastro = document.getElementById("btnCadastro");
  
    btnLogin.addEventListener("click", login);
    btnCadastro.addEventListener("click", cadastro);
  
    function login() {
      const user = document.getElementById("user").value;
      const senha = document.getElementById("senha").value;
      const isHuman = document.getElementById("ehumano").checked;
      const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios") || "[]");
      
      if (isHuman) {
        const usuarioNoLocalStorage = usuariosArmazenados.find(usuario => usuario.user === user);
  
        if (usuarioNoLocalStorage) {
          if (usuarioNoLocalStorage.senha === senha) {
            alert("Login efetuado com sucesso");
            const credenciaisFeias = window.btoa(user + "-" + senha);
            sessionStorage.setItem("credentials", credenciaisFeias);
            window.location.href = "tarefas.html";
          } else {
            alert("Senha incorreta");
          }
        } else {
          alert("Usuário não existe");
        }
      }
    }
  
function cadastro() {
    const novoUsuario = {
      user: document.getElementById("user").value,
      senha: document.getElementById("senha").value
    };
  
    if (!novoUsuario.user || !novoUsuario.senha) {
      alert("Preencha todos os campos.");
      return;
    }
  
    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios") || "[]");
  
    if (usuariosArmazenados.some(usuario => usuario.user === novoUsuario.user)) {
      alert("Este nome de usuário já está em uso. Escolha outro.");
      return;
    }
  
    usuariosArmazenados.push(novoUsuario);
  
    localStorage.setItem("usuarios", JSON.stringify(usuariosArmazenados));
  
    alert("Cadastro realizado com sucesso!");
  }
  });
  