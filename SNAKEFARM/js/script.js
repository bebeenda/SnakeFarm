import { openModal } from "./alerts.js";
import { saveStorage, getStorage } from "./storage.js";
import { play, stop, playOnce, pause } from "./audio.js";
import { scoreFinal } from "./user.js";

window.addEventListener("DOMContentLoaded", function () {

    //declaração das varáveis
    const rows = 10; //linhas
    const cols = 20; //colunas
    const game = document.getElementById("game");
    const scoreEl = document.getElementById("score");
    const grid = []; //uma matriz, por isso tem um vetor

    //declaração foods
    const foodTypes = [
        { class: "fooduva" },
        { class: "foodmaca" },
        { class: "foodpera" },
        { class: "foodlaranja" },
        { class: "foodbala" },
    ]

    //Criação do grid (mundo da cobra)
    for (let r = 0; r < rows; r++) // criação do for para realizar o movimento da cobra 
    { //enquanto as linhas forem menor, faz o grid de linhas
        grid[r] = [];
        for (let c = 0; c < cols; c++) { //enquanto as colunas forem menor
            const cell = document.createElement("div"); //criação de uma div 
            cell.classList.add("cell"); //criação da classe célula 
            game.appendChild(cell);
            grid[r][c] = cell; //criação da matriz 
        }
    }

    //Estado do jogo
    let snake = [{ r: 2, c: 5 }, { r: 2, c: 7 }]; //a cobra começa no "meio"
    let direction = { r: 0, c: 1 };
    let food = { r: 5, c: 5, i: 1 }; // comida começa no 5
    let score = 0; //contador para pontos
    let gameOver = false; //aqui é falso porque o jogo acabou de começar e a cobra ainda não enconstou nos contos

    //Função de redenrizar o tabuleiro
    function render() {
        // Limpa tudo
        for (let r = 0; r < rows; r++)  // entra nas linhas e colunas
        {
            for (let c = 0; c < cols; c++) {
                const cell = grid[r][c];
                cell.className = "cell"; //se a div tiver classe cel é porque ela fica vazia, assim retorna o tabuleiro pro estado inicial
                cell.style.transform = "rotate(0deg)";
            }
        }


        // Para verificar qual comida aleatória irá aparecer
        //console.log('food')
        //console.log(food)
        grid[food.r][food.c].classList.add(foodTypes[food.i].class);


        // Corpo da cobra
        for (let i = 0; i < snake.length; i++) {
            const segment = snake[i]; //o tamanho da cobra é como a cobra está no momento, sendo o i
            const cell = grid[segment.r][segment.c]; //a célula que a cobra está

            if (i === 0) {  //se i for == 0 será a cabeça da cobra que colocará no quadrado, se tornando snake-head no lugar de cell
                // CABEÇA
                cell.classList.add("snake-head");

                // Rotação da cabeça
                if (direction.r === -1) cell.style.transform = "rotate(270deg)"; //move para cima (up)
                if (direction.r === 1) cell.style.transform = "rotate(90deg)"; // move para baixo (down)
                if (direction.c === -1) cell.style.transform = "rotate(180deg)"; //move para a esquerda (left).
                if (direction.c === 1) cell.style.transform = "rotate(0deg)"; //move para a direita (right).

            } else if (i === snake.length - 1) { //como a cobra é um vetor, essa é a última posição da cobra, sendo o rabo o anterior seria o corpo
                // RABO
                cell.classList.add("snake-tail"); //adiciona o rabo na classe

                const prev = snake[i - 1];
                //aqui estamos vendo a direção que o rabo está indo, tendo em vista que nem sempre é a mesma direção da cabeça
                //prev onde o segmento estava
                //segment onde o segmento está agora
                if (prev.r < segment.r) cell.style.transform = "rotate(90deg)";   // vindo de cima
                if (prev.r > segment.r) cell.style.transform = "rotate(270deg)";  // vindo de baixo 180+ 90
                if (prev.c < segment.c) cell.style.transform = "rotate(0deg)";    // vindo da esquerda
                if (prev.c > segment.c) cell.style.transform = "rotate(180deg)";  // vindo da direita


            } else {
                // CORPO

                cell.classList.add("snake-body"); //esse é o meio da cobra, o corpo dela
                const prev = snake[i + 1]; // verdadeiro segmento anterior
                const next = snake[i - 1]; // verdadeiro próximo
                if (prev.r != next.r && prev.c != next.c) {
                    cell.classList.add("snake-turn");
                    console.log('snake: ', snake);
                    const rotation = getCornerOrientation(prev, segment, next);
                    console.log('ROTATION: ', rotation);
                    cell.style.transform = "rotate(" + rotation + "deg)";

                    /*if(prev.r < next.r && prev.c > next.c) //pra cima direita
                    {
                        cell.style.transform = "rotate(90deg)"; 
                    }
                    else if(prev.r < next.r && prev.c < next.c) // pra cima esquerda
                    {
                        cell.style.transform = "rotate(0deg)"; 
                    }
                    else if(prev.r > next.r && prev.c > next.c) //para baixo direita
                    {
                        cell.style.transform = "rotate(180deg)"; 
                    }
                    else if(prev.r > next.r && prev.c < next.c) //para baixo esquerda
                    {
                        cell.style.transform = "rotate(270deg)"; 
                    }*/
                }

                else {
                    if (prev.r < segment.r) cell.style.transform = "rotate(90deg)";   // vindo de cima
                    if (prev.r > segment.r) cell.style.transform = "rotate(270deg)";  // vindo de baixo 180+ 90
                    if (prev.c < segment.c) cell.style.transform = "rotate(0deg)";    // vindo da esquerda
                    if (prev.c > segment.c) cell.style.transform = "rotate(180deg)";  // vindo da direita
                }

            }
        }

        scoreEl.textContent = `Score: ${score}`; //atualização do texto com a pontução atual

    }

    function getCornerOrientation(prev, segment, next) {
        console.log('prev (' + prev.r + ',' + prev.c + ')');
        console.log('segment (' + segment.r + ',' + segment.c + ')');
        console.log('next (' + next.r + ',' + next.c + ')');

        const v1 = {
            row: prev.r - segment.r,
            col: prev.c - segment.c
        };

        const v2 = {
            row: next.r - segment.r,
            col: next.c - segment.c
        };

        // normalize (apenas direção)
        const n1 = {
            row: Math.sign(v1.row),
            col: Math.sign(v1.col)
        };

        const n2 = {
            row: Math.sign(v2.row),
            col: Math.sign(v2.col)
        };

        // Caso horizontal + vertical
        const directions = [n1, n2];

        const hasUp = directions.some(d => d.row === -1);
        const hasDown = directions.some(d => d.row === 1);
        const hasLeft = directions.some(d => d.col === -1);
        const hasRight = directions.some(d => d.col === 1);

        if (hasUp && hasRight) return 0;   // sprite no estado original
        if (hasRight && hasDown) return 90;  // rotacionar 90°
        if (hasDown && hasLeft) return 180; // rotacionar 180°
        if (hasLeft && hasUp) return 270; // rotacionar 270°

        return 0;
    }

    //criação da comida
    function randomFood() {
        let newFood;

        do {
            const randomIndex = Math.floor(Math.random() * foodTypes.length);
            newFood = {
                r: Math.floor(Math.random() * rows),
                c: Math.floor(Math.random() * cols),
                i: randomIndex,
            };

            var blocked = false; //caso crie a comida e ela fique em cima da cobra, nao da certo
            for (const part of snake) {
                if (part.r === newFood.r && part.c === newFood.c) {
                    blocked = true;
                    break;
                }
            }

        } while (blocked);

        return newFood;
    }

    // Atualização do jogo
    function update() {
        if (gameOver) return;

        const head =
        {
            r: snake[0].r + direction.r, //pega a posição atual da cabeça da cobra e 
            c: snake[0].c + direction.c,
        };

        // Colisões
        if (
            head.r < 0 ||
            head.r >= rows ||
            head.c < 0 ||
            head.c >= cols ||
            snake.some((s) => s.r === head.r && s.c === head.c)
        ) {
            gameOver = true;
            openModal("Game Over!", `Pontuacao final: ${score}`, true, true, true, true); //último parametro pra mostrar ou nao a cobra
            stop();
            playOnce("music/gameover.wav");
            scoreFinal(player, score, nivel);
            return;
        }

        snake.unshift(head);

        // Come comida
        if (head.r === food.r && head.c === food.c) {
            playOnce('music/arcade.wav');
            score++;
            food = randomFood();
        }
        else
            snake.pop();


        render();
    }
    //controle da cobra no teclado
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && direction.r !== 1) direction = { r: -1, c: 0 }; //Se a pessoa apertou “seta para cima” E a cobra NÃO está indo para baixo (direction.r !== 1) Então muda a direção para cima { r: -1, c: 0 }.
        if (e.key === "ArrowDown" && direction.r !== -1) direction = { r: 1, c: 0 };
        if (e.key === "ArrowLeft" && direction.c !== 1) direction = { r: 0, c: -1 };
        if (e.key === "ArrowRight" && direction.c !== -1) direction = { r: 0, c: 1 };
    });
    //no jogo não é permitido interver a direção na hora, porque se não a cobra colide com ela mesma
    render();
    var nivel = getStorage("nivel"); //vou no Storage e pego meus valores
    console.log("nivel", nivel);
    if (nivel == 300) {


        play('music/8bit.mp3');
    }
    else if (nivel == 200) {

        play('music/medium.mp3');
    }
    else {

        play('music/boss.mp3');
    }

    //Timer do jogo e cronometro
    let gameTimer = null;
    let isPaused = false;
    let tempo = 0;
    let clockInterval = null;

    clockInterval = setInterval(() => {
        tempo++;
        atualizarRelogio();
    }, 1000);

    gameTimer = setInterval(update, nivel); // velocidade da cobra

    const timerEl = document.getElementById("gameTimer");

    function atualizarRelogio() {
        let minutos = String(Math.floor(tempo / 60)).padStart(2, "0");
        let segundos = String(tempo % 60).padStart(2, "0");
        timerEl.textContent = `${minutos}:${segundos}`;
    }
    // -------- CONTROLES DO TIMER --------

    function pauseGame() {
        if (!gameTimer) return;
        clearInterval(gameTimer);
        clearInterval(clockInterval);
        gameTimer = null;
        console.log("Jogo pausado");
        isPaused = true;
        
    }

    function playGame() {
        // clearInterval(gameTimer);
        gameTimer = setInterval(update, nivel);


        clockInterval = setInterval(() => {
            tempo++;
            atualizarRelogio();
        }, 1000);
        console.log("Jogo playado");

        isPaused = false;
    }

    function stopGame() {
        clearInterval(gameTimer);
        clearInterval(clockInterval);

        gameTimer = null;
        clockInterval = null;

        tempo = 0;                // zera o tempo
        atualizarRelogio();       // atualiza visual
        isPaused = false;
    }


    document.addEventListener("keydown", (e) => {

        if (e.code === "Space") {
            console.log("pressionou espaço");
            if (isPaused) {
                playGame();
                console.log(isPaused);
            } else {
                pauseGame();
                console.log(isPaused);
            }
            //isPaused = !isPaused;
        }

        if (e.key === "r") playGame();
        if (e.key === "s") stopGame();
    });
    //Botões

    const btnPlay = document.getElementById("btnPlay");
    const btnPause = document.getElementById("btnPause");
    const btnStop = document.getElementById("btnStop");

    btnPlay.addEventListener("click", () => {
        playGame();
    });

    btnPause.addEventListener("click", () => {
        pauseGame();
    });

    btnStop.addEventListener("click", () => {
        stopGame();
    });


    //pegar o nome do usuário dinamicamente
    var player = getStorage("saveUser");
    const playerEl = document.getElementById("player");
    playerEl.textContent = `${player}`; //atualização do nome do usuário



    //play e pause na música
    let muted = false;
    document.getElementById("btnMusic").addEventListener("click", function(){
    
        muted = !muted;
    
        if (muted) {
            btnMusic.textContent = "🔇";
            pause(); // sua função de parar música
        } else {
            btnMusic.textContent = "🔊";
            play(); // sua função de tocar música
        }
    });





});