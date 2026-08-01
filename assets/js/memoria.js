const fases = [
    {
        nivel: 1,
        cartas: [
            "../assets/img/memoria/carta1_.jpg",
            "../assets/img/memoria/carta2_.jpg",
            "../assets/img/memoria/carta3_.jpg",
            "../assets/img/memoria/carta4_.jpg"
        ]
    },

    {
        nivel: 2,
        cartas: [
            "../assets/img/memoria/carta1_.jpg",
            "../assets/img/memoria/carta2_.jpg",
            "../assets/img/memoria/carta3_.jpg",
            "../assets/img/memoria/carta4_.jpg",
            "../assets/img/memoria/carta5_.jpg",
            "../assets/img/memoria/carta6_.jpg"
        ]
    },

    {
        nivel: 3,
        cartas: [
            "../assets/img/memoria/carta1_.jpg",
            "../assets/img/memoria/carta2_.jpg",
            "../assets/img/memoria/carta3_.jpg",
            "../assets/img/memoria/carta4_.jpg",
            "../assets/img/memoria/carta5_.jpg",
            "../assets/img/memoria/carta6_.jpg",
            "../assets/img/memoria/carta7_.jpg",
            "../assets/img/memoria/carta8_.jpg"
        ]
    }
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let faseAtual = 0;
let campanhaFinalizada = false;

let tentativas = 0;
let tentativasTotal = 0;
let paresEncontrados = 0;

let tempo = 0;
let tempoTotal = 0;

let movimentosTotal = 0;
let jogoAtual = "Memória";

let intervalo;

const tabuleiro = document.getElementById("tabuleiro");
const contadorTentativas = document.getElementById("tentativas");
const contadorTempo = document.getElementById("tempo");
const faseTela = document.getElementById("faseTela");

function iniciarJogo(){

    if(!tabuleiro) return;
    
    if(faseTela){
        faseTela.textContent =
        `Fase ${faseAtual + 1} / ${fases.length}`;
    }
    
    let cartasAtuais = [
        ...fases[faseAtual].cartas,
        ...fases[faseAtual].cartas
    ];
    
    cartasAtuais.sort(()=>Math.random()-0.5);
    
    tabuleiro.innerHTML = "";
    
    const quantidadeCartas = cartasAtuais.length;
    const tamanhoCarta = window.innerWidth < 768 ? 75 : 140;
    
    if(quantidadeCartas === 8){
        tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

if(quantidadeCartas === 12){
    tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

if(quantidadeCartas === 16){
    tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

if(faseAtual === 0){
    tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

if(faseAtual === 1){
    tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

if(faseAtual === 2){
    tabuleiro.style.gridTemplateColumns = `repeat(4,${tamanhoCarta}px)`;
}

    tentativas = 0;
    paresEncontrados = 0;
    tempo = 0;

    primeiraCarta = null;
segundaCarta = null;
bloqueado = false;

    contadorTentativas.innerHTML = 0;
    contadorTempo.innerHTML = 0;

    document.getElementById("vitoria").style.display = "none";

    clearInterval(intervalo);

    intervalo = setInterval(()=>{
        tempo++;
        contadorTempo.innerHTML = tempo;
    },1000);

    cartasAtuais.forEach(imagem=>{

        const carta = document.createElement("img");

        carta.src = "../assets/img/memoria/carta-verso.jpg";
        carta.dataset.imagem = imagem;
        carta.onclick = virarCarta;

        tabuleiro.appendChild(carta);

    });
}

function virarCarta(){

    if(bloqueado) return;
    if(this === primeiraCarta) return;

    this.src = this.dataset.imagem;

    if(!primeiraCarta){
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;

    tentativas++;
    contadorTentativas.innerHTML = tentativas;

    verificarPar();
}

function verificarPar(){

    if(primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem){

        paresEncontrados++;

        primeiraCarta = null;
        segundaCarta = null;

        if(paresEncontrados === fases[faseAtual].cartas.length){

    clearInterval(intervalo);
    bloqueado = true;

    document.getElementById("vitoria").style.display = "block";

    const botao = document.getElementById("botaoFase");

    if(botao){

        if(faseAtual < fases.length - 1){

            botao.textContent = "Próxima fase";
            botao.onclick = proximaFase;

        }else{

            botao.textContent = "Finalizar";
            botao.onclick = finalizarCampanha;

        }
    }
}

    } else {

        bloqueado = true;

        setTimeout(()=>{

            primeiraCarta.src = "../assets/img/memoria/carta-verso.jpg";
            segundaCarta.src = "../assets/img/memoria/carta-verso.jpg";

            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;

        },800);
    }
}

function proximaFase(){

    if(faseAtual < fases.length - 1){

        tempoTotal += tempo;
        tentativasTotal += tentativas;

        faseAtual++;

        iniciarJogo();

    }

}

function finalizarCampanha(){

    if(campanhaFinalizada)
        return;


    campanhaFinalizada = true;


   tempoTotal += tempo;
movimentosTotal = tentativasTotal + tentativas;

abrirModalNome();
}

function reiniciar(){

    faseAtual = 0;
    campanhaFinalizada = false;

    tempoTotal = 0;
    tentativasTotal = 0;

    iniciarJogo();
}

window.onload = iniciarJogo;