import { atacarAbrirTela } from "./snakeUtil.js";
import { saveStorage } from "./storage.js";
import { play, stop, pause } from "./audio.js";

window.addEventListener("DOMContentLoaded", () => {
     play('music/menu.mp3');
    //criação dos elementos
    var btnFacil = document.getElementById("btnFacil");
    var btnMedio = document.getElementById("btnMedio");
    var btnDificil = document.getElementById("btnDificil");
  
   
    btnFacil.addEventListener("click", function(){ //botão jogar
    saveStorage("nivel", 300); //chave, e valor da velocidade da cobrinha que estou salvando no localStorage
    atacarAbrirTela("index.html");
    
    });

    btnMedio.addEventListener("click", function(){ //botão jogar
    
    saveStorage("nivel", 200);
    atacarAbrirTela("index.html");
    
    });

    btnDificil.addEventListener("click", function(){ //botão jogar
    
    saveStorage("nivel", 100); 
    atacarAbrirTela("index.html");
    
    });


    document.getElementById("btnTexto").addEventListener("click", function(){ //função para abrir a página de cadastro

    atacarAbrirTela("indexInicial.html");

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
