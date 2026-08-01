function abrirModalNome(){

    document.getElementById("modalNome").style.display = "flex";

    document.getElementById("inputNome").value = "";

    document.getElementById("inputNome").focus();

}


function fecharModalNome(){

    document.getElementById("modalNome").style.display = "none";

}


function confirmarNome(){

    const nome =
    document.getElementById("inputNome").value.trim();


    if(nome === "")
        return;


    salvarPontuacao(
        jogoAtual,
        nome,
        tempoTotal,
        movimentosTotal
    );


    fecharModalNome();

    window.location.href = "ranking.html";

}