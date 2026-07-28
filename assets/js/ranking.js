function salvarPontuacao(jogo, nome, tempo, movimentos = null){

    const ranking = JSON.parse(localStorage.getItem("nightfallRanking")) || [];

    ranking.push({

        jogo,
        nome,
      tempo: Number(tempo),
movimentos: movimentos !== null ? Number(movimentos) : null,
        data: new Date().toLocaleDateString("pt-BR")

    });

    ranking.sort((a, b) =>
    Number(a.tempo) - Number(b.tempo) ||
    Number(a.movimentos || 0) - Number(b.movimentos || 0)
);

    localStorage.setItem(
        "nightfallRanking",
        JSON.stringify(ranking)
    );

}

function obterRanking(){

    return JSON.parse(
        localStorage.getItem("nightfallRanking")
    ) || [];

}

function limparRanking(){

    localStorage.removeItem("nightfallRanking");

}