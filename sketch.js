  PLAY = 0;
  END  = 2;
  var gameState ="PLAY"
  var trex, trex_running, trex_collided;
  var ground, invisibleGround, groundImage;
  var score= 0
  var cloud, cloudsGroup, cloudImage;
  var obs,obs1,obs2,obs3,obs4,obs5,obs6
  var obsGroup;
  var newImage;
  
  var Gameover,restart
  var GImage,RImage
  
  var jumpsound , checkpointsound , diesound
  
  function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obs1 =loadImage("obstacle1.png")
  obs2 =loadImage("obstacle2.png")
  obs3 =loadImage("obstacle3.png")
  obs4 =loadImage("obstacle4.png")  
  obs5=loadImage("obstacle5.png")
  obs6 =loadImage("obstacle6.png")
   
      
  GImage= loadImage("gameOver.png")
  RImage= loadImage("restart.png")

  jumpsound =loadSound("jump.mp3")
  checkpointsound =loadSound("checkPoint.mp3")
  diesound =loadSound("die.mp3")
  }

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  Gameover=createSprite(300,90,2,4)
  Gameover.addImage(GImage)
  Gameover.visible=false

  Restart= createSprite(300,140)
  Restart.addImage(RImage)
  Restart.visible=false
 //onsole.log("Hello"+ 5)
 obsGroup = createGroup();
 cloudsGroup =createGroup(); 
 
 trex.setCollider("circle",0,0,40)
 trex.debug=true
}

function draw() {
  background("blue");
  
  text("score"+score,400,50)
  
  console.log("this is",gameState)
  
 
  
  if(gameState==="PLAY"){
   

    ground.velocityX = -(4+2*score/100)
  //to move ground infinite
  if (ground.x < 0){
    ground.x = ground.width/2;
  
  }
  //code for increaseing score
    score = score+ Math.round(getFrameRate()/60)
    
    //two add checkpointsound
   if (score>0 && score%100 ===0){
   checkpointsound.play()  
   }  
    
    
    //to make terex jump
    
 if(keyDown("space")&&trex.y>=162){
 trex.velocityY=-12
 jumpsound. play()
   
 } 
    
   
 //to give gravity
  trex.velocityY = trex.velocityY + 0.8
    
    
  //spawn the clouds
  spawnClouds();
   spawnobs()
  //stop the game when trex touching cactus  
  if(obsGroup.isTouching(trex)){
    gameState="END"
  diesound. play()
  
  //to add AI
    
  //trex.velocityY= -12
  //jumpsound. play()  
  }
  }
 
  
    
    else if(gameState==="END"){
    ground.velocityX = 0;
    
  Gameover.visible=true
   Restart.visible=true

   obsGroup.setVelocityXEach(0)
   cloudsGroup.setVelocityXEach(0)
   
   trex.changeAnimation("collided",trex_collided)
   //set life time of objects so that they are never destroyed
   obsGroup.setLifetimeEach(-1)
   cloudsGroup.setLifetimeEach(-1)
  
   if(mousePressedOver(Restart)){
   reset()  
     
     
   }
   }
  
  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function reset(){
  
gameState = "PLAY" 
score =0
  
Gameover.visible=false
Restart.visible=false

 obsGroup.destroyEach() 
 cloudsGroup.destroyEach()
  
  
  trex.changeAnimation("running", trex_running)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}
function spawnobs(){
  if(frameCount % 100=== 0){
  obs = createSprite(600,170,20,20)  
  obs.velocityX = -(6+2*score/100)  

  var num = Math.round(random(1,6))                                              
  switch(num){
  case 1 : obs.addImage (obs1);   
  break;
  case 2 : obs.addImage (obs2); 
  break;
  case 3 : obs.addImage (obs3);   
  break;
  case 4 : obs.addImage (obs4);   
  break;
  case 5 : obs.addImage (obs5);   
  break;  
  case 6 : obs.addImage (obs6);   
  break;
  default:break;  
  }
  obs.scale=0.5
  obs.lifetime=100  

  obsGroup.add(obs);  

  }

  }