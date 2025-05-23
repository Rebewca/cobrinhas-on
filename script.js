// Play Board = Tela
const playboard = document.querySelector(".play-board");

// Placar atual do jogador

const scoreElement = document.querySelector(".score");

// Record

const highScoreElement =document.querySelector(".high-score"); // elementos fisícos e interatividade

//Controles de movimento
//seleciona elementos <i> icones botoes para Devices Mobiles

const controls = document.querySelectorAll(".controls i");

// Cadastro de Variaveis

//variavel Boleana que Indica se o jogo terminou 

let gameOver = false;
//variavel para armazenar as coordenadas X e Y da comida
let foodX, foodY;

// armazena as coordenadas X e Y da cabeça da cobra (posição)
let snakeX = 6, snakeY = 6;

//variavel para armazenar a velocidade nas direções X e Y, inicialmente em 0, pela cobrinha está parada
let velocityX = 0, velocityY = 0;

// uma Array para armazenar as coordenadas de cada segmento do corpo.

//primeiro elemento é a cabeça

let snakeBody =[];


// variavel para armazenar o Id do inter, que será usado para atualizar o jogo em um determinado ritmo.
let setIntervalId;

//variavel para manter o controle da pontuação atual do jogador
let score = 0; 








//Obtenha pontuação alta do armazenamento local

// tenta recuperar o valor associado á chave "high-score"
let highScore = localStorage.getItem("high-score") || 0;

// Se o localStorage retornar null, a variavel highscore sera definida como 0

//Posicao aleatoria entre number 01 e 30 para a comida

const updateFoodPosition = () => {
    // retorno um numero de ponto flutuante
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random()* 30) + 1;

} 
// Função para lidar com o fim do jogo
// função handleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabu

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Poxa, Deixou Morrer! Aperte Ok para Recomeçar...")
    location.reload();
}


// Função para mudar a direção da cobrinha 

const changeDirection = e => {
   if (e.key === "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;

   } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;

   }else if (e.key ==="ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
   } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
   }



}

controls.forEach(button => button.addEventListener("click",() => changeDirection({key: button.dataset.key})));

//Inicializar o game = init game

const initGame = () => {
    if (gameOver) return handleGameOver();
 let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"> </div> `;

 // quando a cobra se alimenta

if(snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); 
    
    score++;
    highScore = score >= highScore ? score : highScore;


    localStorage.setItem("high-score", highScore); 
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;

}

snakeX += velocityX;
snakeY += velocityY;


for (let i = snakeBody.length - 1; i> 0; i--) {
    snakeBody [i] = snakeBody [i -1];
}

snakeBody[0] = [snakeX,snakeY];

if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
    return gameOver = true;
}
//add div para cada parte do corpo da cobra

for(let i = 0; i <snakeBody .length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
    
    //verifica se a cabeça da cobra atingiu ou colidiu com o corpo

    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[1][0]) {
        gameOver = true;
    }
    playboard.innerHTML = html;

}

}
updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup",changeDirection);







