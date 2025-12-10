export function play(music){
    const audio = document.getElementById("music"); //pega o elemento music na pagina
    console.log('play', music);
    if(audio != null){ //se tem elemento na pagina
        const timeStorage = localStorage.getItem("musicProgress");
        const musicFile = localStorage.getItem("musicFile");

        if(music == musicFile || music == null || music == ''){ //música para tocar é a mesma que estava tocando antes ou continua na mesma
            console.log('continuando', musicFile);
            if(timeStorage){ //verifica se a musica já estava tocando antes no local storage
                audio.currentTime = parseFloat(timeStorage); //coloca a musica no tempo certo

                //vai entrar aqui só se for uma musica que ja estava tocando antes, se não entrar, dá play do inicio.
            }
        }

        if(music != null && music != ''){
            localStorage.setItem("musicFile", music);
            audio.src = music;
        }
        else{
            audio.src = musicFile;
        }
        
        audio.play(); //play no audio
        console.log(audio);
        // Salva a cada meio segundo
        setInterval(() => {
            localStorage.setItem("musicProgress", audio.currentTime);

            //se acabou reinicia
            if (audio.duration > 0 && audio.currentTime >= audio.duration) {
                audio.currentTime = 0;
                localStorage.setItem("musicProgress", 0);
                audio.play();
            }
        }, 100);
    }
}

export function stop(){
    console.log('stop');
    const audio = document.getElementById("music"); //pega o elemento music na pagina

    audio.pause();
    audio.currentTime = 0;
    localStorage.setItem("musicProgress", 0);
    localStorage.setItem("musicFile", '');
}

export function pause(){
    const audio = document.getElementById("music"); //pega o elemento music na pagina
    audio.pause();
}

export function playOnce(music) {
  const audio = document.createElement("audio");
  audio.src = music;
  audio.preload = "auto";

  audio.loop = false;

  audio.addEventListener("ended", () => {
    audio.remove();
  });

  audio.play().catch(err => {
    console.log("Erro ao reproduzir o áudio:", err);
  });
}