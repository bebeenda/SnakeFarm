import { atacarAbrirTela } from "./snakeUtil.js";
import { openModal } from "./alerts.js";
import { addUser, existUser } from "./user.js";
import { play, stop, pause } from "./audio.js";

window.addEventListener("DOMContentLoaded", () => {
     play('music/menu.mp3');
    //criação dos elementos
    var btnCadastro = document.getElementById("btnCadastro");
    var cxUsuario = document.getElementById("cxUsuario");
    var cxSenha = document.getElementById("cxSenha");
    var cxSenhaConfirma = document.getElementById("cxSenhaConfirma");

    document.getElementById("btnTexto").addEventListener("click", function(){ //função para abrir a página de cadastro

    atacarAbrirTela("indexLogin.html");

    });
   

    btnCadastro.addEventListener("click", () => {

        if ((cxUsuario.value == null  || cxUsuario.value.trim() == "") && (cxSenha.value == null || cxSenha.value.trim()=="") && (cxSenhaConfirma.value == null || cxSenhaConfirma.value.trim()=="" ))  
            openModal("Atencao!", "Preencha todos os campos");

        else if(cxSenha.value == null || cxSenha.value.trim()=="")
            openModal("Atencao!", "Preencha a senha");

        else if (cxUsuario.value == null  || cxUsuario.value.trim() == "")
            openModal("Atencao!", "Preencha o usuario");

        else if (cxSenhaConfirma.value == null  || cxSenhaConfirma.value.trim() == "")
            openModal("Atencao!", "Confirme a senha");

        else if(cxSenhaConfirma.value != cxSenha.value)
             openModal("Atencao!", "Senhas nao correspondem!");
    
        else
        {
            if (existUser(cxUsuario.value))
                openModal("Atencao!", "Usuário já existe!");
            
            else
            {
                addUser(cxUsuario.value,cxSenha.value)
                openModal("Usuário cadastrado com sucesso!");
                atacarAbrirTela("indexLogin.html"); //aqui já se encontra em uma função de clicar em botão, então só chamar a função de atacar e abrir tela
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
