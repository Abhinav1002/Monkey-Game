
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
 monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  score = 0;
 
  obstaclesGroup = createGroup();
  FoodGroup      = createGroup();

  
  
}


function draw() {
  background(280);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,100,50);
  
   if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  
  if(keyDown("space")&& monkey.y >= 314.3) {
        monkey.velocityY = -14;
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
   monkey.collide(ground);
  
  
  spawnBanana();
  
  spawnObstacle();
   
    if(obstaclesGroup.isTouching(monkey)){
        monkey.velocityY = 0;
      monkey.velocityX=0;
      
obstaclesGroup.setVelocityXEach(0);                     FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1); FoodGroup.setLifetimeEach(-1);
    }
  
 
  //console.log(monkey.y);
  
 drawSprites();
  
}


function spawnObstacle(){
  
  if (frameCount % 300 === 0){
   var obstacle = createSprite(250,325,10,40);
     obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.17;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
   
   //add each obstacle to the group
    
 }

  
  
  
}

function spawnBanana() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,50,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    FoodGroup.add(banana);
  }
}


















