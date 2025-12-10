
async function loadModal() {
     //baixa o arquivo alerts.html (que contempla somente a div do modal)
    const modalHTML = await fetch("/alerts.html").then(r => r.text());
    //pego a div e insiro na página dinamicamente
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // // Botão fechar
    // document.getElementById("modal-close").addEventListener("click", closeModal);

    // Botão OK
    document.getElementById("modal-ok").addEventListener("click", closeModal);

    // Fechar clicando fora
    document.getElementById("modal-overlay").addEventListener("click", function(e) {
        if (e.target === this) closeModal();
    });
}

loadModal();
//quanddo chamar o script de alerta, vai carregar a função loadModal. 



export function openModal(title, message, showDizzy, playAgain, mainMenu, highScore) {
    document.getElementById("modal-title").textContent = title; //pega titulo
    document.getElementById("modal-message").textContent = message; //pega mensagem
    var dizzyHead = document.getElementById("dizzySnake");
    var btnPlayAgain = document.getElementById("btnPlayAgain");
    var btnMainMenu = document.getElementById("btnMainMenu");
    var btnHighScore = document.getElementById("btnHighScore");
    var btnOk = document.getElementById("modal-ok");
    //imagem da cobra
    if(showDizzy == true)
     dizzyHead.style.display = "block";
    
    else
        dizzyHead.style.display = "none";

    //botão para jogar de novo
    if(playAgain == true)
    {
        btnPlayAgain.style.display = "block";
        btnOk.style.display = "none";
        btnPlayAgain.addEventListener("click", function(){
            window.location.href = "index.html";
        });
    }
    else
        btnPlayAgain.style.display = "none";

    // botão para voltar para menu
    if(mainMenu == true)
    {
        btnMainMenu.style.display = "block";
        btnMainMenu.addEventListener("click", function(){
            window.location.href = "indexInicial.html";
        });
    }
    else
        btnMainMenu.style.display = "none";

    //botão para pontuação

     if(highScore == true)
    {
        btnHighScore.style.display = "block";
        btnHighScore.addEventListener("click", function(){
            window.location.href = "indexLeaderBoard.html";
        });
    }
    else
        btnHighScore.style.display = "none";

    const overlay = document.getElementById("modal-overlay");

    overlay.classList.remove("hide");
    setTimeout(() => overlay.classList.add("show"), 10);
}

export function closeModal() {
    const overlay = document.getElementById("modal-overlay");

    overlay.classList.remove("show");
    setTimeout(() => overlay.classList.add("hide"), 250);
}

