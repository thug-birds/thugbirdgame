const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

let megaImg= new Image()
megaImg.src="./images/pngegg.png"
megaImg.onload=()=>{
    ctx.drawImage(megaImg,0,canvas.height/2,100,100)
}

let megaMan={
    x: 0,
    y: canvas.height/2,
    w: 100,
    h: 100,
}

let laserImg= new Image()
laserImg.src="./images/laser.png"
laserImg.onload=()=>{
    ctx.drawImage(laserImg,canvas.width/2,canvas.height-300,100,300)
}


class Laser {
    constructor(top,height){
        this.x = canvas.width,
        this.y = 0,
        this.w = 100,
        this.h = height
        this.image= laserImg
        this.top= top
        
        }
    
}

// let laserBeam= []
// laserBeam[0]={
//     x:canvas.width,
//     y: 0
// }

// let laserBeam ={
//     x: canvas.width/2,
//     y: canvas.height-laserBeam.h,
//     w: 100,
//     h: 300,
// }
// let laser2Beam ={
//     x: 300,
//     y: 0,
//     w: 100,
//     h: 300,
// }

window.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
        megaMan.y -= 50;
            break;

        case 'ArrowDown':
        megaMan.y+= 50;
        break;
    }
}

const lasers = []

//Spawing enemies in random place aka adding enemy objects to enemy array
setInterval(() => {
    let gap= 100
    let height=600
    let topLaserHeight=Math.random()*300
    let bottomLaserHeight= height-topLaserHeight-gap
    console.log("add a new laser", lasers)
    lasers.push(new Laser(true,topLaserHeight))
    lasers.push(new Laser(false,bottomLaserHeight))
}, 5000)

let score=0
setInterval(() => {
    score += 10
}, 1000)



let int
function animate(){
int=window.requestAnimationFrame(animate)

ctx.clearRect(0,0,canvas.width,canvas.height)

document.querySelector('p span').innerText = score


for (let laser of lasers){
    ctx.drawImage(laser.image,laser.x--,(laser.top?laser.y:canvas.height-laser.h),laser.w,laser.h)
    detectCollision(megaMan, laser)
}

ctx.drawImage(megaImg, megaMan.x, megaMan.y, megaMan.w, megaMan.h)


// document.querySelector('body p').innerHTML = pointcounter
}

animate()

function detectCollision(hero, columns) {
    if (hero.x < columns.x + columns.w &&
        hero.x + hero.w > columns.x &&
        hero.y < columns.y + columns.h &&
        hero.h + hero.y > columns.y) {
        console.log('collision')
        window.cancelAnimationFrame(int)
        // window.location.reload()
    }
    // collision detected!
  }