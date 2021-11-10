const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

let gameOn = false;
let restart = true;
let lasers = []
let score = 0
let gravity= 2

window.onload = function() {
    document.getElementById('start-button').onclick = function() {
      if (!gameOn && restart) {
        playGame();
      }
    };
};

function playGame() {
    restart = false;
    gameOn = true;
    document.getElementById('start-button').blur();
    score=0
    lasers=[]
    megaMan.y=canvas.height/2
    toggleLasers(true)
    animate();
}

function gameOver(){
    restart= true
    gameOn=false
    document.getElementById('start-button').innerText= "RESTART"
    document.getElementById('start-button').onclick = playGame
}

let megaImg= new Image()
megaImg.src="./images/pngegg.png"
megaImg.onload=()=>{
    ctx.drawImage(megaImg,30,canvas.height/2,100,100)
}

let megaMan={
    x: 30,
    y: canvas.height/2,
    w: 100,
    h: 100,
}

let laserImg= new Image()
laserImg.src="./images/laser.png"
laserImg.onload=()=>{
    ctx.drawImage(laserImg,canvas.width,canvas.height-300,100,300)
}


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

window.onkeydown = function (e) {
    switch (e.key) {
        
        case 'ArrowUp':
        megaMan.y -= 50;
            break;

        case 'ArrowDown':
            if(megaMan.y+megaMan.h+50>=canvas.height){
                 console.log("mega man is out",canvas.height-megaMan.y-megaMan.h)
                 megaMan.y=canvas.height-megaMan.h
                 detectCollision(megaMan, {},canvas.height)
            }else{
                megaMan.y+= 50;
        }   
        break;
    }
}

//Spawing enemies in random place aka adding enemy objects to enemy array
// let spawnLasers=setInterval(() => {
//     let gap = 300
//     let height = canvas.height
//     let topLaserHeight=Math.random()*height-300
//     let bottomLaserHeight= height-topLaserHeight-gap
//     console.log("add a new laser", lasers)
//     lasers.push(new Laser(true,topLaserHeight, 0))
//     lasers.push(new Laser(false,bottomLaserHeight, canvas.height-bottomLaserHeight))
// }, 4000)

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

setInterval(() => {
    score += 1
}, 500)


let int

function animate(){
int=window.requestAnimationFrame(animate)
ctx.clearRect(0,0,canvas.width,canvas.height)
document.querySelector('p span').innerText = score

for (let laser of lasers){
    ctx.drawImage(laser.image,laser.x-=3,laser.y,laser.w,laser.h)
       detectCollision(megaMan, laser, canvas.height)      
}
ctx.drawImage(megaImg, megaMan.x, megaMan.y, megaMan.w, megaMan.h)
megaMan.y+=gravity
}


function detectCollision(hero, columns, border) {
    if (hero.x < columns.x + columns.w &&
        hero.x + hero.w > columns.x &&
        hero.y < columns.y + columns.h &&
        hero.h + hero.y > columns.y) {
        console.log('collision')
        window.cancelAnimationFrame(int)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle="white"
        ctx.font="bold 96px Helvetica, Arial, sans-serif"
        ctx.textAlign = "center",
        ctx.fillText("Game Over",canvas.width/2,canvas.height/2)
        ctx.fillText("Score: ",canvas.width/2,canvas.height/2+100)
        ctx.fillText(score,canvas.width/2+220,canvas.height/2+100)
        toggleLasers()
        gameOver()
        
    } else if (hero.y+hero.h>=border){
        console.log('collision bottom')
        window.cancelAnimationFrame(int)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle="white"
        ctx.textAlign = "center",
        ctx.font="bold 96px Helvetica, Arial, sans-serif"
        ctx.fillText("Game Over",canvas.width/2,canvas.height/2)
        ctx.fillText("Score: ",canvas.width/2,canvas.height/2+100)
        ctx.fillText(score,canvas.width/2+220,canvas.height/2+100)
        toggleLasers() 
        gameOver()
    } 
  }