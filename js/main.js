const Width = 600, Height = 359;
const Diagonal = Math.floor(Math.sqrt(Width*Width + Height*Height));
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const shape =  [8,5,4]; // shape of neural network 5 inputs, 3 hidden ,4 output
const btnStart = document.createElement("button");
var Loop = true, populate;

const carImg = new Image();
carImg.src = "img/car.png";
const speedWayImg = new Image();
speedWayImg.src = "img/speedway.jpg";

canvas.width = Width;
canvas.height = Height;
document.body.append(canvas);

const begin = {x:567,y:160} ,end = {x:567,y:200};
const validsPosition = getPositionsValids();
const distances = getDistances(validsPosition,end);
const distanceToBegin = distances[begin.y][begin.x];
var distanceToDie = distanceToBegin+20;

var populate = new Population(500,0.05,0.95);

const run = () => {
    if(Loop){
        draw();
    }
    window.requestAnimationFrame(run);
}
function draw(){
    ctx.drawImage(speedWayImg,0,0,Width,Height);
    //drawSpeedWay();
    if(populate){
        populate.UpdateDraw();
    }
}
run();