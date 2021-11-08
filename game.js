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
    ctx.drawImage(laserImg,0,canvas.height/2,100,100)
}

let laserBeam ={
    x: 0,
    y: canvas.height/2,
    w: 100,
    h: 500,
}

window.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
        megaMan.y -= 50;
            break;
    } 
}

const lasers = []

//Spawing enemies in random place aka adding enemy objects to enemy array
setInterval(() => {
    console.log("add a new laser", lasers)
    lasers.push({
        x: 0,
        y: Math.random() * canvas.width,
        w: 20,
        h: (Math.random() * canvas.width)/2,
    })
}, 3000)



// class ObstaclesTop { //THIS IS FOR TEAM TO MAYBE TRY LATER
//     constructor(x,y,w,h){
//     this.x = Math.random()*canvas.width,
//     this.y = -55,
//     this.w = Math.random()*(canvas.width/2)+100,
//     this.h = 50
//     }
// }

// class ObstaclesBottom {
//     constructor(x,y,w,h){
//     this.x = Math.random()*canvas.width,
//     this.y = -55,
//     this.w = Math.random()*(canvas.width/2)+100,
//     this.h = 50
//     }
// }

let int
function animate(){
int=window.requestAnimationFrame(animate)

ctx.clearRect(0,0,canvas.width,canvas.height)

// ctx.fillStyle = 'purple'
// for (let laser of roadblocks){
//     ctx.fillRect(roadblock.x, roadblock.y +=(2*roadblock.speedModifier), roadblock.w, roadblock.h)
//     detectCollision(car, roadblock)
// }

ctx.drawImage(megaImg, megaMan.x, megaMan.y, megaMan.w, megaMan.h)
ctx.drawImage(laserImg, laserBeam.x, laserBeam.y, laserBeam.w, laserBeam.h)
// document.querySelector('body p').innerHTML = pointcounter
}

animate()


//CODE EXAMPLE

// var cvs = document.getElementById("canvas");  
// var ctx = cvs.getContext("2d");  

// var bird = new Image();  
// var bg = new Image();  
// var fg = new Image();  
// var pipeNorth = new Image();  
// var pipeSouth = new Image();  
  
// bird.src = "images/pngegg.png";  
// bg.src = "images/pngegg.png";  
// fg.src = "images/pngegg.png";  
// pipeNorth.src = "images/pngegg.png";  
// pipeSouth.src = "images/pngegg.png";  
  
// var gap = 85;  
// var constant;  
  
// var bX = 10;  
// var bY = 150;  
  
// var gravity = 1.5;  
  
// var score = 0;  
  
// var fly = new Audio();  
// var scor = new Audio();  
  
// fly.src = "sounds/fly.mp3";  
// scor.src = "sounds/score.mp3";  
  
// document.addEventListener("keydown",moveUp);  
  
// function moveUp(){  
//     bY -= 25;  
//     fly.play();  
// }  
  
// var pipe = [];  
  
// pipe[0] = {  
//     x : cvs.width,  
//     y : 0  
// };  
  
// function draw(){  
      
//     ctx.drawImage(bg,0,0);  
      
      
//     for(var i = 0; i < pipe.length; i++){  
          
//         constant = pipeNorth.height+gap;  
//         ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);  
//         ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);  
               
//         pipe[i].x--;  
          
//         if( pipe[i].x == 125 ){  
//             pipe.push({  
//                 x : cvs.width,  
//                 y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height  
//             });   
//         }  
          
//         if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){  
//             location.reload();
//         }  
          
//         if(pipe[i].x == 5){  
//             score++;  
//             scor.play();  
//         }  
          
          
//     }  
  
//     ctx.drawImage(fg,0,cvs.height - fg.height);  
      
//     ctx.drawImage(bird,bX,bY);  
      
//     bY += gravity;  
      
//     ctx.fillStyle = "#000";  
//     ctx.font = "20px Verdana";  
//     ctx.fillText("Score : "+score,10,cvs.height-20);  
      
//     requestAnimationFrame(draw);  
      
// }  
  
// draw();  