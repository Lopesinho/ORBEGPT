let posicao = 0;

const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const larguraItem = 220;

function moverCarrossel(direcao) {

    const quantidadeItens = track.children.length;

    posicao += direcao;

    // Não deixa voltar antes do primeiro item
    if (posicao < 0) {
        posicao = 0;
    }

    // Não deixa avançar além do último item
    if (posicao > quantidadeItens - 3) {
        posicao = quantidadeItens - 3;
    }

    track.style.transform = `translateX(-${posicao * larguraItem}px)`;
}

prevBtn.addEventListener("click", function () {
    moverCarrossel(-1);
});

nextBtn.addEventListener("click", function () {
    moverCarrossel(1);
});