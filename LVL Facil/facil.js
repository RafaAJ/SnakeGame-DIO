
//Background
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o desenho
let box = 32;

//Cobrinha
let snake = [];
snake[0] = {
    x: 8 * box, //tamnho da cobrinha
    y: 8 * box,
}
let direction = "right";

//Comida
let food = { //Faz gerar a comida randomicamente pelo mapa
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box,
}


function CriarCobrinha() { //Criar cobrinha
    for(i=0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


function CriarBG(){ //Criar background
    context.fillStyle = "lightgreen" ; //Cor
    context.fillRect(0, 0, 16 * box, 16 * box); //Tamanho da caixa
}

document.addEventListener('keydown', update); //direciona a cobrinha para baixo

function update(event){ //Define os comandos para controlar a cobrinha
    if(event.keyCode == 65 && direction != "right") direction = "left";
    if(event.keyCode == 87 && direction != "up") direction = "down";
    if(event.keyCode == 68 && direction != "left") direction = "right";
    if(event.keyCode == 83 && direction != "down") direction = "up";
}


function IniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "down") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ //Detecta se a cobrinha encostou em seu proprio corpo
            clearInterval(jogo); //para o jogo se a cobrinha encostar em seu corpo
            alert('Game Over :(');
        }
    }

    CriarBG();
    CriarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; //Define os movimentos da cobrinha
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){ // Detecta se a cobrinha comeu a fruta
        snake.pop(); //destroe a cabeça anterior
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }


    let newHead = { //cria uma nova cabeça para que ela não suma
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead); //cria uma cabeça na posição que ela está indo
}

let jogo = setInterval(IniciarJogo, 200); //tempo para iniciar o jogo

