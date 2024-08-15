const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const bricks = document.querySelectorAll('.brick');
const gameOver = document.getElementById('gameOver');


const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');

let xSpeed= 4;
let ySpeed = -4;


let ballX = 385;
let ballY = 610;

let isgameOver = false;
let sounds;
let over;
sounds = new Audio('sounds/tutu.wav');
over = new Audio('sounds/over.wav')

function movePaddle(e) {
    
    
    const game = document.getElementById('game');
    if(e.key === "ArrowRight" && paddle.offsetLeft < (game.offsetWidth -  paddle.offsetWidth)){
    
     paddle.style.left =  paddle.offsetLeft + 10 + "px";


  
    }
    else if(e.key === "ArrowLeft" && paddle.offsetLeft > 0){

        paddle.style.left = paddle.offsetLeft -10 + "px";
    }

}

addEventListener('keydown', movePaddle);


function moveBall() {
    


 ballX += xSpeed;

 ball.style.left = ballX + "px";


 ballY += ySpeed;
 ball.style.top = ballY + "px";


 if(ballX <=0 ||  ballX + ball.offsetWidth >=700){

  xSpeed *= -1;
 sounds.play();

 }

if(ballY <=0 ){

    ySpeed *= -1;
    sounds.play();
}


if(ballY+ ball.offsetHeight >= paddle.offsetTop // ball is at same vertical line
    && ballX + ball.offsetWidth >= paddle.offsetLeft // ball hit right side
    && ballX <= paddle.offsetLeft + paddle.offsetWidth )//ball hit left side
    {
    ySpeed *= -1;
    sounds.play();
    
    const paddleCentre = (paddle.offsetLeft + paddle.offsetWidth)/2;
   const ballCentre  = (ballX + ball.offsetWidth)/2;

   const hitPosition = ballCentre - paddleCentre;

   xSpeed = hitPosition * 0.3;
   sounds.play();
    
}

bricks.forEach(function (brick){

 if(brick.style.visibility !=='hidden'
    && ballY <= brick.offsetTop+ brick.offsetWidth
    && ballY + ball.offsetHeight >=brick.offsetTop
    && ballX + ball.offsetWidth >= brick.offsetLeft
    && ballX <= brick.offsetLeft + brick.offsetWidth 

 ){

brick.style.visibility = 'hidden';
sounds.play();
ySpeed *= -1;

 }





});



//reset
if(ballY >=700){

ballX = 385;
ballY = 610;
xSpeed = 4;
ySpeed = -4;
 
isgameOver = true;
triggergameOver();

}



 }
 
 function reset() {

    clearInterval(timer);
    timer = null; // Reset timer reference
    gameOver.style.visibility = 'hidden';

ballX = 385;
ballY = 610;
xSpeed = 4;
ySpeed = -4;

ball.style.left = ballX + "px";
ball.style.top = ballY + "px"; 

paddle.style.left = "50%";
bricks.forEach(function(brick) {

    brick.style.visibility = 'visible';


    
});


 }

var timer;
 function start() {
    
if(isgameOver){
    reset();
  
}

 timer = setInterval(moveBall, 30);
 
 resetButton.addEventListener('click', reset);

 }


function triggergameOver() {

    gameOver.style.visibility = 'visible'; // Show game over message
    clearInterval(timer); 
    over.play();
    timer = null; 
    
   
}



 startButton.addEventListener('click', start);



