// something you have to do 
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

let backgroundMusic = new Audio ("./music/Music.mp3");
let gameOverMusic = new Audio ("./music/GameOverSound.mp3");
let openMusic = new Audio ("./music/OpenSound.mp3");


// declaring global variables
let gameOn = false;
let restart = true;
let lasers = []
let score = 0
let gravity= 2.5
// sets variable conditions and allows you to start the game
window.onload = function() {
    openMusic.play();
    document.getElementById('start-button').onclick = function() {
      if (!gameOn && restart) {
        playGame();
      }
    };
};
// function that starts the game (animation)
function playGame() {
    if (!gameOn){
        restart = false;
        gameOn = true;
        openMusic.pause();
        backgroundMusic.play();
        document.getElementById('start-button').blur();
        score=0
        lasers=[]
        megaMan.y=canvas.height/2
        toggleLasers(true)
        animate();
    }
    
}
// changing the button from start game to restart
function gameOver(){
    restart= true
    gameOn=false
    document.getElementById('start-button').innerText= "RESTART"
    document.getElementById('start-button').onclick = playGame
    
}
//Mega man image
let megaImg= new Image()
megaImg.src="./images/pngegg.png"
megaImg.onload=()=>{
    ctx.drawImage(megaImg,30,canvas.height/2,100,100)
}
//Mega man object
let megaMan={
    x: 30,
    y: canvas.height/2,
    w: 100,
    h: 100,
}
// laser image
let laserImg= new Image()
laserImg.src="./images/laser.png"
laserImg.onload=()=>{
    ctx.drawImage(laserImg,canvas.width,canvas.height-300,100,300)
}

// laser class that sets the coordinates and dimensions for the laser
class Laser {
    constructor(top,height, y){
        this.x = canvas.width,
        this.y = y,
        this.w = 100,
        this.h = height
        this.image= laserImg
        this.top= top
        }
}
// moves megaman up and down also detects collision when mega man hits the bottom border
window.onkeydown = function (e) {
    switch (e.key) {
        
        case 'ArrowUp':
        megaMan.y -= 50;
            break;

        case 'ArrowDown':
            if(megaMan.y+megaMan.h+50>=canvas.height){
                 console.log("mega man is out",canvas.height-megaMan.y-megaMan.h)
                 megaMan.y=canvas.height-megaMan.h
                 detectFloorCollision(megaMan,canvas.height)
            }else{
                megaMan.y+= 50;
        }   
        break;
    }
}
// function that generates the laser and controls the the rate that they are being sent at mega man 
// also stops the lasers from generating after the game is over
let spawnLasers;
function toggleLasers(bool){
    if(bool){
            spawnLasers=setInterval(() => {
            let gap = 300
            let height = canvas.height
            let topLaserHeight=Math.random()*height-300
            let bottomLaserHeight= height-topLaserHeight-gap
            console.log("add a new laser", lasers)
            lasers.push(new Laser(true,topLaserHeight, 0))
            lasers.push(new Laser(false,bottomLaserHeight, canvas.height-bottomLaserHeight))
            
        }, 4000)
    }else{
        clearInterval(spawnLasers)

    }
}
// Score interval
setInterval(() => {
    score += 1
}, 500)


let int
// Game engine
function animate(){
int=window.requestAnimationFrame(animate)
ctx.clearRect(0,0,canvas.width,canvas.height)
document.querySelector('p span').innerText = score
//draws lasers 
for (let laser of lasers){
    ctx.drawImage(laser.image,laser.x-=3,laser.y,laser.w,laser.h)
       detectLaserCollision(megaMan, laser)      
}
//draws mega Man
ctx.drawImage(megaImg, megaMan.x, megaMan.y, megaMan.w, megaMan.h)
megaMan.y+=gravity
detectFloorCollision(megaMan,canvas.height) 
}

// ends game when mega man collides with a laser
// gives the 'game over' graphic when the game ends
function detectLaserCollision(hero, columns) {
    if (hero.x < columns.x + columns.w &&
        hero.x + hero.w > columns.x &&
        hero.y < columns.y + columns.h &&
        hero.h + hero.y > columns.y) {
        console.log('collision')
        collisionOccur()
    } 
}
         
        
function detectFloorCollision(hero,border){
     if (hero.y+hero.h>=border){
        console.log('collision bottom')
        collisionOccur()
        
    } 
}

function collisionOccur(){
    toggleLasers() 
    window.cancelAnimationFrame(int)
    backgroundMusic.pause();
    gameOverMusic.play();
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="white"
    ctx.textAlign = "center",
    ctx.font="bold 96px Helvetica, Arial, sans-serif"
    ctx.fillText("Game Over",canvas.width/2,canvas.height/2)
    ctx.fillText("Score: ",canvas.width/2,canvas.height/2+100)
    ctx.fillText(score,canvas.width/2+220,canvas.height/2+100)
    gameOver()
}

