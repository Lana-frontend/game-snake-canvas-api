const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const htmlScore = document.getElementById('score')
const htmlBonus = document.getElementById('bonus')

console.log(localStorage.getItem('best'), 1);

const apple = new Image();
apple.src = './img/apple.png';
apple.width = '16px';
apple.height = '16px';

let counterFruit = 0;
let lvl = 0;
let currentSpeed;
let a = 0;
let bonuseSpeed = 1;

function changeSpeed(param) {
    if(param === 1) {
        localStorage.setItem('speed', 150);
    } else if(param === 2) {
        localStorage.setItem('speed', 100);
    } else if(param === 3) {
        localStorage.setItem('speed', 60);
    }
} 


const formSnake = {
    head: new Image(),
    body: new Image(),
    tail: new Image(),
}

let coef_speed;

{
    const lsSpeed = Number(localStorage.getItem('speed'));
    if(lsSpeed === 150){
        currentSpeed = 0.7;
        formSnake.head.src = './img/snakes/head.png';
        formSnake.body.src = './img/snakes/body.png';
        formSnake.tail.src = './img/snakes/tail.png';
        coef_speed = 0.7
    } else if(lsSpeed === 100){
        currentSpeed = 1;
        formSnake.head.src = './img/snakes1/head.svg';
        formSnake.body.src = './img/snakes1/body.svg';
        formSnake.tail.src = './img/snakes1/tail.svg';
        coef_speed = 1
    } else if(lsSpeed === 60){
        currentSpeed = 1.3;
        formSnake.head.src = './img/snakes2/head.svg';
        formSnake.body.src = './img/snakes2/body.svg';
        formSnake.tail.src = './img/snakes2/tail.svg';
        coef_speed = 1.3
    }
}

const box = 30;
let deg = 0;
let speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed;
let food;
let bonus;
let snake = [];
let score = 0;
let formBonus;

console.log();

snake[0] = {
    x: 8 * box,
    y: 8 * box
}
snake[1] = {
    x: 9 * box,
    y: 8 * box
}

let coef_lvl = 1 + lvl / 10;

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right"){
        dir = "left";
        deg = 0;
    }
	else if(event.keyCode == 38 && dir != "down"){
        dir = "up";
        deg = 90;
    } 
	else if(event.keyCode == 39 && dir != "left"){
        dir = "right";
        deg = 180
    }
	else if(event.keyCode == 40 && dir != "up"){
        dir = "down";
        deg = 270;
    }
}

function drawImageRot(img,x,y,width,height,deg){

    var rad = deg * Math.PI / 180;

    ctx.translate(x + width / 2, y + height / 2);

    ctx.rotate(rad);

    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

function buildArea(){
    for(let i = 0; i < 20; i++) {
        for(let y = 0; y < 20; y++){
            if(i % 2 !== 0 && y % 2 !== 0){
                ctx.fillStyle = '#7cc44f'
            } else if(i % 2 !== 0 || y % 2 !== 0){
                ctx.fillStyle = '#a8f578'
            } else {
                ctx.fillStyle = '#7cc44f'
            }
            ctx.fillRect(i * box, y * box, box, box);
        }
    }
}

generateFood = async () => {
    let x = Math.floor(Math.random() * 16) * box;
    let y;
    const arrY = [];
    const allY = [];

    snake.forEach((body) => {
        if(body.x === x) {
            arrY.push(body.y)
        }
    });

    if(arrY.length > 0){
        let currentY;

        for(let i = 1; i <= 16; i++){
            currentY = i * box;
            allY.push(currentY)
        }

       await allY.forEach((item, index) => {
           if(arrY.some((i) => i === item)){
               allY.splice(index, 1)
           }
       })

       y = allY[Math.floor(Math.random() * allY.length)]
    } else {
        y = Math.floor(Math.random() * 16) * box;
    }

    food = {
        x: x,
        y: y
    };
}

generateFood();
let interval;
let typeBonuse;
let timer;
generateBonuse = async () => {
    typeBonuse =  Math.floor(Math.random() * 2) + 1;

    bonus = new Image();

    if(typeBonuse === 1) {
        bonus.src = './img/rabbit.png';
    } else if (typeBonuse === 2) {
        bonus.src = './img/bird.png';
    } else if (typeBonuse === 3) {
        bonus.src = './img/snail.png';
    }

    let x = Math.floor(Math.random() * 16) * box;
    let y;
    const arrY = [];
    const allY = [];

    snake.forEach((body) => {
        if(body.x === x) {
            arrY.push(body.y)
        }
    });

    if(arrY.length > 0){
        let currentY;

        for(let i = 1; i <= 16; i++){
            currentY = i * box;
            allY.push(currentY)
        }

       await allY.forEach((item, index) => {
           if(arrY.some((i) => i === item)){
               allY.splice(index, 1)
           }
       })

       y = allY[Math.floor(Math.random() * allY.length)]
    } else {
        y = Math.floor(Math.random() * 16) * box;
    }

    formBonus = {
        x: x,
        y: y
    };

    setTimeout(() =>{ bonus = '' }, 5000);
    timer = 5;
    htmlBonus.innerHTML = timer + 's';
    interval = setInterval(() => {
        htmlBonus.innerHTML = timer-- + 's';
        if(timer === 0) {
            clearInterval(interval)
            htmlBonus.innerHTML = '>>'
            timer = 5
        }
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if(event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "Arrow"){
        a = 0.5
        speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed;
    } else if(event.code === "Escape"){
        pauseGameChange();
    }
  });

document.addEventListener('keyup', function(event) {
    if(event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "Arrow"){
        a = 0
        speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed;
    }
  });

let pauseGame = false;  

pauseHtml = document.getElementById('pause')
endHtml = document.getElementById('end-game');

function pauseGameChange() {
    pauseGame = !pauseGame;

    if(!pauseGame) {
        pauseHtml.style.display = 'none'
    } else {
        pauseHtml.style.display = 'grid'
    }
}

function endGameChange() {
    endHtml.style.display = 'grid'
}

function restartGame(){
    location.reload()
}

function eatFood(){
    const eat = {
        x: dir === 'right' ? snake[snake.length -1].x - box : dir === 'left' ? snake[snake.length -1].x + box: snake[snake.length -1].x,
        y: dir === 'up' ? snake[snake.length -1].y + box : dir === 'down' ? snake[snake.length -1].y - box : snake[snake.length -1].y,
    }  
    snake.push(eat);
    
    generateFood();
    score += (coef_speed * coef_lvl * 50);
    htmlScore.innerHTML = score
    let chanse = 2;
    
    if(score > 0 && score % 2 === 0 && !bonus) {
        if(chanse > Math.random() * 10) {
            generateBonuse()
        }
    }

    counterFruit++;

    if(counterFruit > 0 && counterFruit % 5 === 0 && lvl < 11){
        lvl++
    }
}

function eatBonus() {
    clearInterval(interval)
    htmlBonus.innerHTML = '>>'
    timer = 5

    if(typeBonuse === 1) {
        score += 200;
        htmlScore.innerHTML = score
    } else if (typeBonuse === 2) {
        bonuseSpeed = 1.3
        speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed; 
    } else if (typeBonuse === 3) {
        bonuseSpeed = 0.7
        speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed; 
    } 

    setTimeout(() =>{ 
        bonuseSpeed = 1
        speed = Number(localStorage.getItem('speed')) * (currentSpeed + lvl / 10 + a) * bonuseSpeed; 
    }, 5000);

    bonus = ''
}

const tailParams = {
    x: snake[snake.length - 1].x,
    y: snake[snake.length - 1].y
}
let endGame = false;
function drawGame(){
    buildArea();

    if(bonus) {
        ctx.drawImage(bonus, formBonus.x, formBonus.y);
    }

    ctx.drawImage(apple, food.x, food.y);

    for(let i = 0; i < snake.length; i++){
        if(i === 0) {
            drawImageRot(formSnake.head, snake[i].x, snake[i].y, 30, 30, deg);
        } else if(i === snake.length - 1){
            if(snake[i].x > snake[i-1].x){
                drawImageRot(formSnake.tail, snake[i].x, snake[i].y, 30, 30, 0);
            } else if(snake[i].x < snake[i-1].x){
                drawImageRot(formSnake.tail, snake[i].x, snake[i].y, 30, 30, 180);
            } else if(snake[i].y > snake[i-1].y){
                drawImageRot(formSnake.tail, snake[i].x, snake[i].y, 30, 30, 90);
            } else if(snake[i].y < snake[i-1].y){
                drawImageRot(formSnake.tail, snake[i].x, snake[i].y, 30, 30, 270);
            }
        } else {
            drawImageRot(formSnake.body, snake[i].x, snake[i].y, 30, 30, deg);
        }

        if(i !== 0) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                endGame = true
                endGameChange();
            }
        }
    }

    if(snake[0].x > 19 * box || snake[0].x < 0 || snake[0].y < 0 || snake[0].y > 19 * box) {
        endGame = true;
        endGameChange();
    }
    
    if(!pauseGame && !endGame && dir){
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        snake.pop();

        if(dir == "left") snakeX -= box;
        if(dir == "right") snakeX += box;
        if(dir == "up") snakeY -= box;
        if(dir == "down") snakeY += box;
    

        let newHead = {
            x: snakeX,
            y: snakeY
        };

        snake.unshift(newHead);
    }
    
    if(food.x === snake[0].x && food.y === snake[0].y){
        eatFood(food.x, food.y);
    }

    if( bonus && formBonus.x === snake[0].x && formBonus.y === snake[0].y){
        eatBonus()
    }

    if(endGame === true) {
       if (localStorage.getItem('best')) {
            if(Number(localStorage.getItem('best') < score)){
                localStorage.setItem('best', score)
            }
       } else {
           localStorage.setItem('best', score)
       }
    }

}

let game = setInterval(drawGame, speed)