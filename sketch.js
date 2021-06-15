const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

//creating variables

var batAnimation,bat;
var engine, world;
var nightImg;
var edges;
var bg;
var obstacleImg;
var obstaclesGroup;
var gameOverImg;
var gameState="PLAY";
var gameOver;
var obstacleUp;
var obstacleDown;
var score=0;

function preload(){
   
//loading images

    batAnimation = loadAnimation("bat1.png","bat2.png","bat3.png",
                        "bat4.png","bat5.png","bat6.png",
                        "bat7.png","bat8.png","bat9.png",
                        "bat10.png","bat11.png","bat12.png");
    nightImg=loadImage("Night.bg.jpeg");                    
    obstacleImg=loadImage("yellowrec.png");
    gameOverImg=loadImage("gameOver.jpeg");

}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(800,400);
    
    //creating the background
    bg= createSprite(600,200);
    bg.addImage(nightImg);
    nightImg.resize(1600,400);
    bg.velocityX=-(5+score/100);

    //creating bat
    bat= createSprite(200,300,40,20);
    bat.scale=0.5;
    bat.addAnimation("moving_bat",batAnimation);
    bat.debug=false;
    bat.setCollider("rectangle",0,0,180,80);
    edges= createEdgeSprites()

    gameOver=createSprite(400,200);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.2;
    gameOver.visible=false; 
    
    obstaclesGroup = new Group();
    
}

function draw(){
    Engine.update(engine);
    background(0); 
    
    if(gameState==="PLAY"){

    score=score+Math.round(frameRate()/60);
    //moving the bat with up and down arrow keys
    if(keyDown("UP_ARROW")){
    bat.velocityY=-3;    
    }
    
    if(keyDown("DOWN_ARROW")){
        bat.velocityY=3;    
    }
    
    //resetting the background image
    if(bg.x<0){
     bg.x=width/2;   
    }   
    
    if(bat.isTouching(obstaclesGroup)){
    gameState="END";    
    }

    spawnObstacles();
    
    }
    if(gameState==="END"){
    bg.velocityX=0;
    gameOver.visible=true;
    bat.velocityX=0; 
    bat.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    }

    //making the bat bounce off the edges   
    bat.bounceOff(edges)

    drawSprites();
    textSize(20);
    fill("white");
    text("Score :" + score,500,50);
    

}   
function spawnObstacles(){
if(frameCount%100===0){
obstacleUp=createSprite(800,Math.round(random(0,50)));
obstacleUp.addImage(obstacleImg);
obstacleUp.velocityX=-(5+score/100);
obstacleUp.scale=0.3;
obstacleUp.lifetime=600;
obstacleUp.debug=false;
bat.depth=obstacleUp.depth;
bat.depth+=1;

obstacleDown=createSprite(800,Math.round(random(400,350)));
obstacleDown.addImage(obstacleImg);
obstacleDown.velocityX=-(5+score/100);
obstacleDown.scale=0.3;
obstacleDown.lifetime=600;
obstacleDown.debug=false;
bat.depth=obstacleDown.depth;
bat.depth+=1;
obstacleUp.setCollider("rectangle",0,0,240,550);
obstacleDown.setCollider("rectangle",0,0,240,550);
obstaclesGroup.add(obstacleUp);
obstaclesGroup.add(obstacleDown);
}    
}