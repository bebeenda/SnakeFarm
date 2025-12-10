import { play,pause } from "./audio.js";
import { getObject, getStorage } from "./storage.js";

window.addEventListener("DOMContentLoaded", () => {
// pega a lista de jogadores
var jogadores = getObject("users"); // normalmente a chave é string
var nivel = getStorage("nivel"); //vou no Storage e pego meus valores do nivel

// ordena do MAIOR para o MENOR score
//nivel facil
var nivelEl = document.getElementById("nivel");
if(nivel == 300)
{   
    nivelEl.textContent = "FACIL";
    jogadores.sort((a, b) => b.scoreFacil - a.scoreFacil);
}

//nivel medio
if(nivel == 200)
{
    nivelEl.textContent = "MEDIO";
    jogadores.sort((a, b) => b.scoreMedio - a.scoreMedio);
}


//nivel dificil
if(nivel == 100)
{   
    nivelEl.textContent = "DIFICIL";
    jogadores.sort((a, b) => b.scoreDificil - a.scoreDificil);
}


const jogadorEl = document.getElementById("playerScore");

for (let i = 0; i < jogadores.length; i++)
    {
    const nomeEl = document.createElement("p");   // cria <span>
    nomeEl.className = "nome-jogador";               // classe (pode ser id se for único)

    if(nivel == 300)
    {
        if(jogadores[i].scoreFacil == undefined)
        {
            jogadores[i].scoreFacil = 0;
        }
        nomeEl.textContent = jogadores[i].username + " ------------------------------------   " + jogadores[i].scoreFacil;               // nome do jogador
    }
    if(nivel == 200)
    {
        if(jogadores[i].scoreMedio == undefined)
        {
            jogadores[i].scoreMedio = 0;
        }
        nomeEl.textContent = jogadores[i].username + " ------------------------------------   " + jogadores[i].scoreMedio;               // nome do jogador
    }
    if(nivel == 100)
    {
        if(jogadores[i].scoreDificil == undefined)
        {
            jogadores[i].scoreDificil = 0;
        }
        nomeEl.textContent = jogadores[i].username + " ------------------------------------   " + jogadores[i].scoreDificil;               // nome do jogador com Score
    }
   

    jogadorEl.appendChild(nomeEl);                   // adiciona no <p>


    // const scoreEl = document.createElement("span");   // cria <span>
    // scoreEl.className = "score";               // classe (pode ser id se for único)
    // scoreEl.textContent = jogadores[i].score;               // nome do jogador

    // jogadorEl.appendChild(scoreEl);            
 }

    document.getElementById("btnBackMenu").addEventListener("click", function(){
        window.location.href = "indexInicial.html";

    });

      let muted = false;
        document.getElementById("btnMusic").addEventListener("click", function(){
        
            muted = !muted;
        
            if (muted) {
                btnMusic.textContent = "🔇";
                pause(); // sua função de parar música
            } else {
                btnMusic.textContent = "🔊";
                play("music/vitoria.mp3"); // sua função de tocar música
            }
        });
        




    play("music/vitoria.mp3");


});
