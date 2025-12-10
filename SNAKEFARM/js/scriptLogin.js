import { atacarAbrirTela } from "./snakeUtil.js";
import { openModal } from "./alerts.js";
import { checkUser } from "./user.js";
import { play, playOnce, stop, pause } from "./audio.js";
window.addEventListener("DOMContentLoaded", () => {


    play('music/menu.mp3');
    //criação dos elementos
    var btnJogar = document.getElementById("btnJogar");
    var cxUsuario = document.getElementById("cxUsuario");
    var cxSenha = document.getElementById("cxSenha");


    document.getElementById("btnTexto").addEventListener("click", function () { //função para abrir a página de cadastro

        atacarAbrirTela("indexCadastro.html");

    });


    btnJogar.addEventListener("click", () => {

        if ((cxUsuario.value == null || cxUsuario.value.trim() == "") && (cxSenha.value == null || cxSenha.value.trim() == ""))

            openModal("Atencao!", "Preencha todos os campos");

        else if (cxSenha.value == null || cxSenha.value.trim() == "")
            openModal("Atencao!", "Preencha a senha");

        else if (cxUsuario.value == null || cxUsuario.value.trim() == "")
            openModal("Atencao!", "Preencha o usuario");

        else {
            var usuarios = JSON.parse(localStorage.getItem("users")) || [];

            if (usuarios.length === 0) 
            {
                openModal("Atencao!", "Usuario nao cadastrado!");
            }
            else if (checkUser(cxUsuario.value, cxSenha.value)) 
            {
                atacarAbrirTela("indexNivel.html");
            }
            else {
                openModal("Atencao!", "Usuario nao encontrado!");
            }

        }


    });


    let muted = false;
    document.getElementById("btnMusic").addEventListener("click", function(){
    
        muted = !muted;
    
        if (muted) {
            btnMusic.textContent = "🔇";
            pause(); // sua função de parar música
        } else {
            btnMusic.textContent = "🔊";
            play("music/menu.mp3"); // sua função de tocar música
        }
    });
    

});
