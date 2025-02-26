const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const DescansoCurto = document.querySelector('.app__card-button--curto');
const DescansoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image'); 
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBT = document.querySelector('#start-pause span');
const tempoNaTela =document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const musicaPlay = new Audio ('/sons/play.wav');
const musicaPause = new Audio ('/sons/pause.mp3');
const TempoAcabou = new Audio ('/sons/beep.mp3');


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


const inconeImagem = document.querySelector('.app__card-primary-butto-icon');

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
       musica.play(); 
    } else {
        musica.pause();
    }
})


foco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alternarContexto('foco');
    foco.classList.add('active');

})

DescansoCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alternarContexto('descanso-curto');
    DescansoCurto.classList.add('active');

});

DescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alternarContexto('descanso-longo');
    DescansoLongo.classList.add('active');

});

function alternarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute ('src', `/imagens/${contexto}.png`);
    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
    Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
    ` ;
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
             <strong class="app__title-strong"> Faça uma pausa longa.</strong>` ;
            break;
    }

}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        TempoAcabou.play(); 
        alert('Tempo Finalizado');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)

        }
        zerar();        
         
        return;
    }

    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        musicaPause.play();
        zerar();
        return;
        
    }
    musicaPlay.play(); 
    intervaloId = setInterval(contagemRegressiva, 1000 );
    iniciarOuPausarBT.textContent = "Pausar";
    inconeImagem.setAttribute('src', '/imagens/pause.png');
  
}

function zerar(){
   
    clearInterval(intervaloId);
    iniciarOuPausarBT.textContent = "Começar";
    inconeImagem.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
    
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
       minute: '2-digit', second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();