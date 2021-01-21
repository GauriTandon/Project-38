var banana, bananaImage, foodGroup;
var backImage, theme;
var obstacle, obstacleImage, obstaclegroup;
var player, player_running;
var ground;
var score;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {
  
  backImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  
}


function setup() {
  
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  
  theme = createSprite(0, 0, 100, 100);
  theme.addImage(backImage);
  theme.scale = 3;
  theme.velocityX = -4;
  
  player = createSprite(100, 250, 20, 20);
  player.addAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  player.scale = 0.20;
  
  ground = createSprite(0, 250, 1000, 10);
  ground.visible = false;
  
  score = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  /*if (obstacleGroup.isTouching(player)) {
    player.scale = 0.10;
  }*/
  
}


function draw() {
  
 background(220);
  
 if (gameState === PLAY) {
   
 player.setCollider("rectangle");
  
  player.collide(ground);
  player.velocityY = player.velocityY + 0.5;
    
  if (theme.x < 0) {
    theme.x = theme.width/2;  
 }
   
  switch(score) {
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
    default: break;
  }
   
  
  if (foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
  }
 
  if (keyWentDown("space")) {
    player.velocityY = -10;
  }
  
  spawnfood();
  spawnobstacles();
  drawSprites(); 
   
  stroke("white");
  textSize(20);
  fill("white");
  text("score = " + score, displayWidth - 400, displayHeight - 800);
    
 } else if (gameState === END) {
   
     background(0);
     stroke("white");
     textSize(25);
     fill("white");
     text("Game Over", displayWidth/2 - 50, displayHeight/2);
   }
  
}


function spawnfood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(500, 100, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -9;
    banana.lifetime = 100;
    banana.setCollider("circle");
    
    foodGroup.add(banana);
  }
  
}


function spawnobstacles() {
  
  if (frameCount % 200 === 0) {
    obstacle = createSprite(500, 210, 10, 10);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 100;
    obstacle.setCollider("circle");   
    
    obstacleGroup.add(obstacle);
  }
  
  if (obstacleGroup.isTouching(player)) {
   gameState = END;
  }
}
