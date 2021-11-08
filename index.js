const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const megaImg= new Image()
megaImg.src="./images/pngegg.png"
megaImg.onload=()=>{
    ctx.drawImage(megaImg,150,canvas.height/2,10,10)
}

// let megaMan={
//     x: 0,
//     y: 100,
//     w: (megaImg.width / 16) * .5,
//     h: megaImg.height * .5,
//     direction: 'right',
//     frames: 16,
//     img: megaImg
// }

function animate(){
    int=window.requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)\
    ctx.drawImage(megaImg,megaMan.x,megaMan.y,megaMan.w,megaMan.h)
}