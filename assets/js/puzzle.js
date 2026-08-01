
const tabuleiro = document.getElementById("tabuleiro");
const tempoTela = document.getElementById("tempo");
const movimentosTela = document.getElementById("movimentos");
const vitoriaTela = document.getElementById("vitoria");
const faseTela = document.getElementById("faseTela");

const fases = [
    {
        nivel: 1,
        linhas: 3,
        colunas: 3,
        imagem: "../assets/img/puzzle/horror1.jpg"
    },
    {
        nivel: 2,
        linhas: 4,
        colunas: 4,
        imagem: "../assets/img/puzzle/horror2.jpg"
    },
    {
        nivel: 3,
        linhas: 5,
        colunas: 5,
        imagem: "../assets/img/puzzle/horror3.jpg"
    }
];

let faseAtual = 0;

let linhas = fases[faseAtual].linhas;
let colunas = fases[faseAtual].colunas;
let imagemAtual = fases[faseAtual].imagem;

let tempoTotal = 0;
let movimentosTotal = 0;
let campanhaIniciada = false;
let campanhaFinalizada = false;

let tamanho;

let pecas = [];
let movimentos = 0;
let tempo = 0;
let intervalo;

let arrastando = null;
let offsetX = 0;
let offsetY = 0;

function posicaoOcupada(x, y, ignorarPeca){

    return pecas.some(p =>
        p !== ignorarPeca &&
        p.x === x &&
        p.y === y
    );
}

function calcularTamanho() {
    if (window.innerWidth < 768) {
       const larguraTabuleiro = Math.min(window.innerWidth * 0.9, 295);
tamanho = Math.floor(larguraTabuleiro / colunas);
    } else {
        tamanho = 90;
    }
}

function iniciar(){

    clearInterval(intervalo);

    linhas = fases[faseAtual].linhas;
    colunas = fases[faseAtual].colunas;
    calcularTamanho();
    imagemAtual = fases[faseAtual].imagem;

    tabuleiro.innerHTML = "";

    pecas = [];
    movimentos = 0;
    tempo = 0;

if(!campanhaIniciada){

    tempoTotal = 0;
    movimentosTotal = 0;

    campanhaIniciada = true;
}

    movimentosTela.textContent = 0;
    tempoTela.textContent = 0;


vitoriaTela.style.display = "none";

   if(faseTela){
    faseTela.textContent =
    `Fase ${faseAtual + 1} / ${fases.length}`;
}

    tabuleiro.style.position = "relative";
    tabuleiro.style.width = `${colunas * tamanho}px`;
    tabuleiro.style.height = `${linhas * tamanho}px`;

    criarPecas();

    intervalo = setInterval(()=>{

        tempo++;

        tempoTela.textContent = tempo;

    },1000);

}


function criarPecas(){

    const imagem = imagemAtual;


    let lista = [];


    for(let y=0;y<linhas;y++){

        for(let x=0;x<colunas;x++){

            lista.push({

                id: lista.length,

                corretoX: x * tamanho,
                corretoY: y * tamanho,

                x:0,
                y:0,

                encaixada:false

            });

        }

    }


    lista.sort(()=>Math.random()-0.5);

    let posicoes = [];
for(let y = 0; y < linhas; y++){
 for(let x = 0; x < colunas; x++){

     posicoes.push({
         x: x * tamanho,
         y: y * tamanho
     });
 }
}

posicoes.sort(()=>Math.random()-0.5);


    lista.forEach((peca,index)=>{


        const elemento =
            document.createElement("div");


        elemento.className = "peca";


        elemento.style.position = "absolute";

        elemento.style.width =
            tamanho+"px";

        elemento.style.height =
            tamanho+"px";


        elemento.style.backgroundImage =
            `url(${imagem})`;


        elemento.style.backgroundSize =
            `${colunas*tamanho}px ${linhas*tamanho}px`;


        elemento.style.backgroundPosition =
            `-${peca.corretoX}px -${peca.corretoY}px`;



let posX = posicoes[index].x;
let posY = posicoes[index].y;



        peca.x = posX;
        peca.y = posY;


        elemento.style.left =
            peca.x+"px";


        elemento.style.top =
            peca.y+"px";



        peca.elemento = elemento;


        pecas.push(peca);


        tabuleiro.appendChild(elemento);


        adicionarArrastar(peca);


    });

}


function adicionarArrastar(peca){

    const elemento = peca.elemento;


    elemento.addEventListener("mousedown", iniciarArraste);


    function iniciarArraste(e){

        arrastando = peca;
        peca.antigoX = peca.x;
        peca.antigoY = peca.y;

        elemento.classList.add("arrastando");

        offsetX =
        e.clientX - peca.x;

        offsetY =
        e.clientY - peca.y;


        elemento.style.zIndex = 10;


        document.addEventListener(
            "mousemove",
            mover
        );


        document.addEventListener(
            "mouseup",
            soltar
        );

    }



    function mover(e){

        if(!arrastando)
            return;


        let novoX =
        e.clientX - offsetX;


        let novoY =
        e.clientY - offsetY;


        peca.x = novoX;
        peca.y = novoY;


        elemento.style.left =
        novoX+"px";


        elemento.style.top =
        novoY+"px";

    }



    function soltar(){

        if(!arrastando)
            return;


        movimentos++;

        movimentosTela.textContent =
        movimentos;

const destinoX = Math.round(peca.x / tamanho) * tamanho;
const destinoY = Math.round(peca.y / tamanho) * tamanho;

if(!posicaoOcupada(destinoX, destinoY, peca)){

    peca.x = destinoX;
    peca.y = destinoY;

}else{

    peca.x = peca.antigoX;
    peca.y = peca.antigoY;

}

peca.elemento.style.left = peca.x + "px";
peca.elemento.style.top = peca.y + "px";

        const distanciaX =
        Math.abs(
            peca.x - peca.corretoX
        );


        const distanciaY =
        Math.abs(
            peca.y - peca.corretoY
        );



        if(
            distanciaX < 30 &&
            distanciaY < 30
        ){

            peca.x =
            peca.corretoX;


            peca.y =
            peca.corretoY;


            peca.elemento.style.left =
            peca.x+"px";


            peca.elemento.style.top =
            peca.y+"px";


            peca.encaixada = true;

        }


        peca.elemento.style.zIndex = 1;
        elemento.classList.remove("arrastando");

        arrastando = null;


        document.removeEventListener(
            "mousemove",
            mover
        );


        document.removeEventListener(
            "mouseup",
            soltar
        );


        verificarVitoria();

    }

}



function verificarVitoria(){

    const completo =
    pecas.every(
        p=>p.encaixada
    );


 if(completo){

    clearInterval(intervalo);

    vitoriaTela.style.display = "block";

    const botao =
    document.getElementById("botaoFase");

    if(botao){

        if(faseAtual < fases.length - 1){
            botao.textContent = "Próximo nível";
            botao.onclick = proximaFase;
        }else{

            botao.textContent = "Finalizar";
            botao.onclick = finalizarCampanha;
        }
    }
}}


function reiniciar(){

    faseAtual = 0;

    tempoTotal = 0;
    movimentosTotal = 0;

    campanhaIniciada = false;
campanhaFinalizada = false;

    iniciar();
}

function proximaFase(){

    if(faseAtual < fases.length - 1){

        tempoTotal += tempo;
        movimentosTotal += movimentos;

        faseAtual++;

        iniciar();

    }else{

        finalizarCampanha();
    }
}

function finalizarCampanha(){

    if(campanhaFinalizada)
        return;

    campanhaFinalizada = true;

    const nome = prompt("Digite seu nome:");
    if(nome){

    tempoTotal += tempo;
    movimentosTotal += movimentos;

    salvarPontuacao(
        "Puzzle",
        nome,
        tempoTotal,
        movimentosTotal
    );
}

    vitoriaTela.style.display = "block";
}


function fecharVitoria(){
    vitoriaTela.style.display = "none";
}
function abrirRanking(){
    window.location.href = "ranking.html";
}

document.addEventListener("touchstart", function(e){

    const toque = e.touches[0];

    const alvo = document.elementFromPoint(
        toque.clientX,
        toque.clientY
    );

    if(alvo && alvo.classList.contains("peca")){

        alvo.dispatchEvent(new MouseEvent(
            "mousedown",
            {
                clientX: toque.clientX,
                clientY: toque.clientY,
                bubbles:true
            }
        ));

    }

});


document.addEventListener("touchmove", function(e){

    const toque = e.touches[0];

    document.dispatchEvent(new MouseEvent(
        "mousemove",
        {
            clientX: toque.clientX,
            clientY: toque.clientY,
            bubbles:true
        }
    ));

});


document.addEventListener("touchend", function(){

    document.dispatchEvent(
        new MouseEvent("mouseup")
    );

});

window.onload = iniciar;