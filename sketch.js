const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,polygon,ground;
var stand1,stand2;
var polygon;
var slingShot;
var polygon_img, backgroundImg;
var score=0;
var bg = "images/light.jpg";
function preload(){
  getBackgroundImage();
  polygon_img=loadImage("images/polygon.png");
  
}
function setup() {
  createCanvas(900,400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = new Ground();
  stand1 = new Stand(390,300,250,10);
  stand2 = new Stand(700,200,200,10);
 
  //level one
  block1 = new Block(300,275,30,40);
  console.log(block1);
  block2 = new Block(330,275,30,40);
  block3 = new Block(360,275,30,40);
  block4 = new Block(390,275,30,40);
  block5 = new Block(420,275,30,40);
  block6 = new Block(450,275,30,40);
  block7 = new Block(480,275,30,40);
  

  //polygon holder with slings
  polygon = Bodies.circle(50,200,20);
  World.add(world,polygon);
  
  slingShot = new Slingshot(this.polygon,{x:100,y:200});

}
function draw() {
  //background(56,44,44); 
  if(backgroundImg)
    background(backgroundImg);
  //Engine.update(engine);
  text(mouseX + ',' + mouseY, 10, 15);
  textSize(20);
  fill("lightyellow");
  text("Drag the polygon to destroy the blocks",300,30);
  text("SCORE : "+score,750,40);
  textSize(10);
  text("Press Space to get a second Chance to Play!!",650 ,350);
  ground.display();
  stand1.display();
  stand2.display();
  strokeWeight(2);
  stroke(15);
  fill("skyblue");
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
 
}
function mouseDragged(){
  Matter.Body.setPosition(this.polygon,{x:mouseX,y:mouseY});
}
function mouseReleased(){
  slingShot.fly();
}
function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(this.polygon);
  }
}
async function getBackgroundImage(){
   var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   var responseJSON = await response.json();

   var datetime = responseJSON.datetime;
   var hour = datetime.slice(11, 13);
   //console.log(hour);

   if (hour >= 06 && hour <= 18) {
     bg = "images/light.jpg";
   } else {
     bg = "images/dark.jpg";
   }

   backgroundImg = loadImage(bg);
   console.log(backgroundImg);
}