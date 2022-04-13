const somFundo = new Audio("music/music.mp3");
const somGameOver = new Audio("music/gameover.mp3");
const somMover = new Audio("music/move.mp3");
const somComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]

var fruta = { x: Math.floor(Math.random() * 18), y: Math.floor(Math.random() * 18) }
var pontos = 0;

var ultimavezatualizar
var velocidade = 7

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimavezatualizar) / 1000 < 1 / velocidade) {
        return;
    }
    ultimavezatualizar = tempoAtual;
    // console.log(tempoAtual)

    atualizaGame();

}

function verificaColisao() {
    //verifica colisao com ela mesma 
    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;
        }
    }
    //verifica colisao com borda 
    if (cobrinha[0].x >= 18 || cobrinha.x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0) {
        return true;
    }
    return false;
}
function verificaComeuFruta(){
if(cobrinha[0].x==fruta.x && cobrinha[0].y == fruta.y){
    pontos += 10;
    pontuacao.innerHTML = pontos+ " - pontos";
    cobrinha.unshift( {x:cobrinha[0].x+direcao.x,y:cobrinha[0].y+direcao.y})
   fruta.x = Math.floor(Math.random() * 16)+1;
   fruta.y = Math.floor(Math.random() * 16)+1;
}

}


function atualizaGame() {

    var colidiu = verificaColisao();
    if(colidiu == true){
        alert("GAME OVER MANÉ")
        cobrinha = [{ x: 5, y: 5 }]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }
    
    verificaComeuFruta();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }

    }
    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var cobrinhaParte = document.createElement('div');
        cobrinhaParte.style.gridRowStart = cobrinha[i].y;
        cobrinhaParte.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            cobrinhaParte.classList.add("head");
        } else {
            cobrinhaParte.classList.add("snake");
        }
        board.appendChild(cobrinhaParte);
    }

    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta");
    board.appendChild(frutinha);

}

function direcionaCobrinha(e) {

    // somMover.play();

    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            direcao.y = -1
            direcao.x = 0;
            break;
        case "KeyA":
        case "ArrowLeft":
            direcao.y = 0
            direcao.x = -1;
            break;
        case "KeyS":
        case "ArrowDown":
            direcao.y = 1
            direcao.x = 0;
            break;
        case "KeyD":
        case "ArrowRight":
            direcao.y = 0
            direcao.x = 1;
            break;
    }
}
window.addEventListener("keydown", (e) => direcionaCobrinha(e))




principal();