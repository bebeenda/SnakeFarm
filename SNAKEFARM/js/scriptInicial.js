
import { play, stop, pause } from "./audio.js";
window.addEventListener("DOMContentLoaded", function(){
    play('music/menu.mp3');
var background = document.getElementById("background");

var tongue = false;
setInterval(() => {
    if(!tongue)
    {
        background.src = "img/background2.png";
        tongue = true;
    }
   else
    {
        background.src = "img/background.png"
        tongue = false;
    }
}, 1000); // 1000 milissegundos = 1 segundo

document.getElementById("btnJogar").addEventListener("click", function() {

    const screen = document.getElementById("transition-screen");
    screen.classList.add("active");

    setTimeout(() => {
        window.location.href = "indexLogin.html";
    }, 600);
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
