
 import {  playOnce } from "./audio.js";
 
 //criação dos elementos
    var btnJogar = document.getElementById("btnJogar");
    const snake = document.getElementById("headSnake"); //imagem da cabeça da cobra
    snake.src = "img/headPNG1.png";
    const tela = document.querySelector(".gb-screen");

    // Função de ataque
    function atacar() {
        playOnce('music/snake.wav');
        snake.src = "img/headPNG.png";
        snake.classList.add("cobra-atacando");
        tela.classList.add("tela-tremendo");

        setTimeout(() => {
            snake.classList.remove("cobra-atacando");
            tela.classList.remove("tela-tremendo");
            snake.src = "img/headPNG1.png";
        }, 500);
    }

  
export function atacarAbrirTela(tela){
    atacar();
    
    setTimeout(() => { //antes das seta estaria escrito function
    const screen = document.getElementById("transition-screen");
    screen.classList.add("active");
    
    setTimeout(() => {
    window.location.href = tela; //aqui abre a página de cadastro
    }, 700);
    
    }, 1000);
}
   


