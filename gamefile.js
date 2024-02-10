// Variables

//Character Variables
let playerX, playerY, playerW = 28, playerH = 40;
let up = false, down = false, left = false, right = false;
let allEnemys = (Math.random()), enemyX, enemyY, enemyW = 25, enemyH = 25, slimeX, slimeY, slimeW = 25, slimeH = 25, enemyX2, enemyY2, enemyX3, enemyY3;
let bossHealth = 50;
let speed = 2.5, bossSpeedX = 2, bossSpeedY = 2;
let bossR, bossL;
let bossX, bossY, bossW = 187, bossH = 96;
let testX = 200, testY = 200, testW = 25, testH = 25;
let testHealth = 10;
let dmg = 2;
let oldPlayer;

// Object Variables
let wall1X, wall1Y, wall2X, wall2Y, wall3X, wall3Y, wall4X, wall4Y, wall5X, wall5Y, wall6X, wall6Y, wall7X, wall7Y, wall8X, wall8Y, wallW, wallH, wallW2, wallH2, wallW3, wallH3, wallW4, wallH4, wallW5, wallH5, wallW6, wallH6, wallW7, wallH7, wallW8, wallH8;
let iWallX, iWallY, iWallW, iWallH, iWallX2, iWallY2, iWallW2, iWallH2, iWallX3, iWallY3, iWallW3, iWallH3, iWallX4, iWallY4, iWallW4, iWallH4;
let walls;
let healthPotion = 0, chestX = 150, chestY = 150, chestW = 25, chestH = 25, chest = false;
let normalChest, baskChest;
let chestUsesLeft = 1;

// Sprite Variables
let xDirection = -1;
let yDirection = -1;
let playerName;
let heart, heartX, heartY;
let healthPts = 10;
let playerState = 0;
let slashW = 81, slashH = 63;
let leftSlash, rightSlash;

// Room Variables
let zone = 0;
let bossRoom, finalRoom;
let chooseSide = (Math.random());
let room1, room2, room3, room4, room5, room6, room7, room8;

// Misc Variables
let score;
let playerBulletX, playerBulletY, playerBulletW = 10, playerBulletH = 5, bossBulletX, bossBulletY, bossBulletW, bossBulletH;
const SPLASH = 1, GAME = 2, INSTRUCTIONS = 3, GAMEOVER = 4;
let currentScreen = SPLASH;
let playX = 250, playY = 250, playW = 100, playH = 50;
let intructions;
let gameoverimage;
let beatgameimage;
let instructionsX, instructionsY, instructionsW, instructionsH;
let mainMenuX, mainMenuY, mainMenuW, mainMenuH;
let r, g, b;
let gameOver = false;

// functions:

function setup() {
  createCanvas(500, 500);
  playerX = width / 2;
  playerY = height / 2;
  bossX = 150;
  bossY = 125;
  zone = 0;
  setupWalls();
  instructionsX = ((width - 150) / 2);
  instructionsY = 300;
  instructionsW = 150;
  instructionsH = 50;
  mainMenuX = 10;
  mainMenuY = (height - 35);
  mainMenuW = 150;
  mainMenuH = 25;
  mainMenuButton = new Button(10, height - 35, 150, 25, "blue", "< Back to Main Menu", "yellow");
  instructionsButton = new Button(instructionsX, instructionsY, instructionsW, instructionsH, "red", "Instructions", "white");
  heartX = (width - 150);
  heartY = 17;
}

function preload() {
  bossR = loadImage("images/evilFishFacingRight.png");
  bossL = loadImage("images/evilFishFacingLeft.png");
  red = loadImage("images/WeirdSpriteStuff.png");
  intructions = loadImage("images/intructions.png");
  normalChest = loadImage("images/normalChest.png");
  baskChest = loadImage("images/baskChest.png");
  heart = loadImage("images/HEALTHHEARTS.png");
  rightSlash = loadImage("images/rightSlash.png");
  leftSlash = loadImage("images/leftSlash.png");
  gameoverimage = loadImage("images/gameover.png");
  beatgameimage = loadImage("images/2ndgameoverscreen.png");
}

function draw() {
  if (currentScreen === SPLASH) {
    splashScreen();
    instructionsButton.draw();
  } else if (currentScreen === GAME) {
    zones();
    moveCharacter();
    if (playerState === 0) {
      moveSprite();
    } else {
      playerSlash();
    }
    drawHearts();
    fill("red");
    textSize(16);
    text("Potions: " + healthPotion, 425, 480);
    checkGameover();
    if (gameOver === true) {
      currentScreen = GAMEOVER;
    }
  } else if (currentScreen === INSTRUCTIONS) {
    instructionsScreen();
    mainMenuButton.draw();
  } else if (currentScreen === GAMEOVER) {
    gameoverScreen();
    if (bossHealth === 0) {
      image(beatgameimage, 25, 80, 405, 240);
    }
  }
}

// final room of the game, player is at the boss room for the BOSS,
function finalBossRoom() {
  background(160);
  fill("orange");
  rect(0, 0, width, 25);
  rect(0, (height - 25), width, 25);
  noStroke();
  text("Boss Health: " + bossHealth, width - (width / 5), 45);
  if (bossRoom === -5) {
    image(bossR, bossX, bossY);
  } else if (bossRoom === 5) {
    image(bossL, bossX, bossY);
  }
  bossMovement();
  if (areColliding(playerX, playerY, playerW, playerH, bossX, bossY, bossW, bossH)) {
    healthPts -= 1;
    bossSpeedX *= -1;
    bossSpeedY *= -1;
    playerX -= (playerW - 10);
    playerY -= (playerH - 10);
  }
}

/** 
* create some walls in each of the rooms
*/
function setupWalls() {
  wallH = 50, wallW = width, wallH2 = 50, wallW2 = width, wallW3 = 50, wallH3 = 150, wallW4 = 50, wallH4 = 150, wallW5 = 50, wallH5 = 150, wallW6 = 50, wallH6 = 150, wall1X = 0, wall1Y = 0, wall2X = 0, wall2Y = (height - wallH), wall3X = 0, wall3Y = 0, wall4X = (width - wallW4), wall4Y = 0, wall5X = 0, wall5Y = (height - wallH5), wall6X = (width - wallW6), wall6Y = (height - wallH6), wall7X = 0, wall7Y = 0, wallW7 = 50, wallH7 = height, wall8X = (width - 50), wall8Y = 0, wallW8 = 50, wallH8 = height;
  iWallX = 0, iWallY = 0, iWallW = 50, iWallH = 150, iWallX2 = (width - wallW4), iWallY2 = 0, iWallW2 = 50, iWallH2 = 150, iWallX3 = 0, iWallY3 = (height - wallH5), iWallW3 = 50, iWallH3 = 150, iWallX4 = (width - wallW6), iWallY4 = (height - wallH6), iWallW4 = 50, iWallH4 = 150;
}

function drawWalls() {
  noStroke();
  fill("darkgrey");
  rect(wall1X, wall1Y, wallW, wallH);
  rect(wall2X, wall2Y, wallW2, wallH2);
  rect(wall3X, wall3Y, wallW3, wallH3);
  rect(wall4X, wall4Y, wallW4, wallH4);
  rect(wall5X, wall5Y, wallW5, wallH5);
  rect(wall6X, wall6Y, wallW6, wallH6);
  fill("blue");
}

/**
 * Draws zones or the rooms
 */
function zones() {
  chooseRoomPosition();
  if (zone === 0) {
    background(0);
    drawWalls();
    mainRoomChest();
    fill("green");
    rect(testX, testY, testW, testH);
  } else if (zone < 0) {
    if (zone === -1) {
      background(0);
      drawWalls();
      drawEnemies();
    } else if (zone === -2) {
      background(0);
      drawWalls();
    } else if (zone === -3) {
      background(0);
      drawWalls();
    } else if (zone === -4) {
      background(0);
      drawWalls();
      if (bossRoom !== -5) {
        fill("darkgrey");
        rect(wall7X, wall7Y, wallW7, wallH7);
        if (areColliding(playerX, playerY, playerW, playerH, wall7X, wall7Y, wallW7, wallH7)) {
          left = false;
        }
      }
    }
    // BOSS ROOM
    else if (zone === bossRoom) {
      finalBossRoom();
    }
    // YOU HAVE ESCAPED THE DUNGEON, OR YOU FINISHED THE GAME ROOM
    else if (zone === finalRoom) {
      background("limegreen");
      fill("grey");
      rect(width / 2 - width / 4, 0, 50, width / 2 - width / 4);
    }
  }
  // POSITIVE ZONES, OR ZONES ON THE RIGHT WING
  else if (zone > 0) {
    if (zone === 1) {
      background(0);
      drawWalls();
    } else if (zone === 2) {
      background(0);
      drawWalls();
    } else if (zone === 3) {
      background(0);
      drawWalls();
    } else if (zone === 4) {
      background(0);
      drawWalls();
      if (bossRoom !== 5) {
        fill("darkgrey");
        rect(wall8X, wall8Y, wallW8, wallH8);
        if (areColliding(playerX, playerY, playerW, playerH, wall8X, wall8Y, wallW8, wallH8)) {
          right = false;
        }
      }
    }
    // BOSS ROOM
    else if (zone === bossRoom) {
      finalBossRoom();
    }
    // YOU HAVE ESCAPED THE DUNGEON ROOM, OR THE YOU HAVE FINISHED THE GAME ROOM
    else if (zone === finalRoom) {
      background("limegreen");
      rect(width / 2 - width / 4, 0, 50, width / 2 - width / 4);
      fill("grey");
    }
  }
}

/**
*  move the player
*/
function moveCharacter() {
  wallCollisions();
  if (right === true) {
    playerX += speed;
  } else if (left === true) {
    playerX -= speed;
  }
  
  if (up === true) {
    playerY -= speed;
  } else if (down === true) {
    playerY += speed;
  }
  if (playerX < 0) {
    playerX = 500 + 1;
    zone -= 1;
  } else if (playerX > 500) {
    playerX = 0;
    zone += 1;
  }
}

/*
 picks random colour
 */
function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}


/*
* title screen, or the splash screen of the game
*/
function splashScreen() {
  if (currentScreen === SPLASH) {
    background(0);
    text("PLAY", playX, playY);
    fill("white");
    textSize(16);
    naniMackerel();
  }
}

/*
 * Draws the gameoverscreen
 */
function gameoverScreen() {
  if (currentScreen === GAMEOVER) {
    background(0);
    if (healthPts === 0) {
      tint(r, g, b);
      image(gameoverimage, 125, 225, 250, 50);
      pickColor();
    }
  } else if (bossHealth === 0) {
    image(beatgameimage, 0, 0);
  }
}

/**
 * draws the intruction screen
 */
function instructionsScreen() {
  if (currentScreen === INSTRUCTIONS) {
    background(0);
    instructions();
    image(intructions, 24.5, 25);
  }
}

/**
 * text inside of the instructions screen
 */
function instructions() {
  fill("white");
  textSize(12);
  text("\n\n\n\n\n\n\nThe Objective of the Game is to reach the end of the Dungeon, \nface the boss and escape the Dungeon. Throughout exploring the dungeon,\n you may encounter mobs, and chests before you reach the final boss. \n\nIf you encounter a chest, to get the items in the chest, all you need to do is go over the chest itself. \n\nThe keys you will need to play the game are just WASD, Space, and Q. \nWASD are used to move the player, and Q is used to activate potions. \nWith every potion used, you will gain 2 hearts. \nIf a potion is used when you have full health, nothing will happen. The Space key triggers the attack.", width / 2, 50);
  text("To defeat the Slimes you must hit them twice in order to defeat them. \n The boss has 50 health you need to deplete in order to beat it.", width / 2, 325);
  textFont('Comfortaa');
  textAlign(CENTER);
}

/**
 * just some basic text for the title screen, or splashScreen();
 */
function naniMackerel() {
  textSize(45);
  fill("white");
  text("NANI なに\nMackerel 死", width / 2, height / 4);
  textAlign(CENTER);
}

/*
* to move to character, or the functions to move them, to make up, down, left, right true or false.
*/
function keyPressed() {
  if (keyCode === 68) {
    right = true;
  } else if (keyCode === 65) {
    left = true;
  }

  if (keyCode === 87) {
    up = true;
  } else if (keyCode === 83) {
    down = true;
  } else if (keyCode === 80) {
    usePotions();
  } else if (keyCode === 32) {
    playerState++;
  }
}

function keyReleased() {
  if (keyCode === 68) {
    right = false;
  } else if (keyCode === 65) {
    left = false;
  } else if (keyCode === 87) {
    up = false;
  } else if (keyCode === 83) {
    down = false;
  }
}

function areColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x2 < x1 + w1
    && y1 < y2 + h2 && y2 < y1 + h1;
}

function mouseClicked() {
  if (dist(mouseX, mouseY, playX, playY) <= (playX, playY, playW, playH)) {
    currentScreen = GAME;
  } else if (dist(mouseX, mouseY, instructionsX, instructionsY) <= (instructionsX, instructionsY, instructionsW, instructionsH)) {
    currentScreen = INSTRUCTIONS;
  } else if (dist(mouseX, mouseY, mainMenuX, mainMenuY) <= (mainMenuX, mainMenuY, mainMenuW, mainMenuH)) {
    currentScreen = SPLASH;
  }
}

/**
 *  Choose the side that the boss room will be at.
*/
function chooseRoomPosition() {
  if (chooseSide < 0.25) {
    bossRoom = -5;
    finalRoom = -6;
  } else if (chooseSide < 0.5) {
    bossRoom = 5;
    finalRoom = 6;
  } else if (chooseSide < 0.75) {
    bossRoom = -5;
    finalRoom = -6;
  } else {
    bossRoom = 5;
    finalRoom = 6;
  }
}

function wallCollisions() {
  if (areColliding(playerX, playerY, playerW, playerH, wall1X, wall1Y, wallW, wallH)) {
    up = false;
  } else if (areColliding(playerX, playerY, playerW, playerH, wall2X, wall2Y, wallW2, wallH2)) {
    down = false;
  } else if (areColliding(playerX, playerY, playerW, playerH, wall3X, wall3Y, wallW3, wallH3)) {
    left = false;
    up = false;
  } else if (areColliding(playerX, playerY, playerW, playerH, wall4X, wall4Y, wallW4, wallH4)) {
    right = false;
    up = false;
  } else if (areColliding(playerX, playerY, playerW, playerH, wall5X, wall5Y, wallW5, wallH5)) {
    left = false;
    down = false;
  } else if (areColliding(playerX, playerY, playerW, playerH, wall6X, wall6Y, wallW6, wallH6)) {
    right = false;
    down = false;
  }
}


function drawEnemies() {
  enemyX = random(51, 449);
  enemyY = random(51, 449);
  enemyX2 = random(51, 449);
  enemyY2 = random(51, 449);
  enemyX3 = random(51, 449);
  enemyY3 = random(51, 449);
  slimeX = random(51, 449);
  slimeY = random(51, 449);
  fill("green");
  rect(enemyX, enemyY, enemyW, enemyH);
  rect(slimeX, slimeY, slimeW, slimeH);
  enemyMovement();
  if (allEnemys > 0.75) {
    fill("green");
    rect(enemyX, enemyY, enemyW, enemyH);
    rect(enemyX2, enemyY2, enemyW, enemyH);
    rect(enemyX3, enemyY3, enemyW, enemyH);
    enemyMovement();
  } else if (allEnemys > 0.95) {
    fill("green");
    rect(enemyX, enemyY, enemyW, enemyH);
    rect(enemyX2, enemyY2, enemyW, enemyH);
    rect(enemyX3, enemyY3, enemyW, enemyH);
    rect(slimeX, slimeY, slimeW, slimeH);
    enemyMovement();
  }
  /*if (allEnemys <= Math.floor(Math.random() * 10)) {
    if (Math.random < 0.45) {
      fill(Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155);
      enemyX1 = random(width);
      enemyY1 = random(height);
      fill("green");
      rect(enemyX, enemyY, enemyW, enemyH);
      enemyMovement();
      allEnemys += 1;
    } else if (Math.random > 0.46) {
      fill(Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155);
      slimeX = random(width);
      slimeY = random(height);
      fill("green");
      rect(slimeX, slimeY, slimeW, slimeH);
      enemyMovement();
      allEnemys += 1;
    }
  }*/
}

function enemyMovement() {
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall1X, wall1Y, wallW, wallH) === false) {
    enemyY += Math.sign(playerY - enemyY);
  }
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall2X, wall2Y, wallW2, wallH2) === false) {
    enemyY += Math.sign(playerY - enemyY);
  }
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall3X, wall3Y, wallW3, wallH3) === false) {
    enemyX += Math.sign(playerX - enemyX);
  }
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall4X, wall4Y, wallW4, wallH4) === false) {
    enemyX += Math.sign(playerX - enemyX);
  }
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall5X, wall5Y, wallW5, wallH5) === false) {
    enemyX += Math.sign(playerX - enemyX);
  }
  if (areColliding(enemyX, enemyY, enemyW, enemyH, wall6X, wall6Y, wallW6, wallH6) === false) {
    enemyX += Math.sign(playerX - enemyX);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall1X, wall1Y, wallW, wallH) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall2X, wall2Y, wallW2, wallH2) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall3X, wall3Y, wallW3, wallH3) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall4X, wall4Y, wallW4, wallH4) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall5X, wall5Y, wallW5, wallH5) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
  if (areColliding(slimeX, slimeY, slimeW, slimeH, wall6X, wall6Y, wallW6, wallH6) === false) {
    slimeY += Math.sign(playerY - slimeY);
  }
}

function drawChests() {
  fill("saddlebrown");
  rect(chestX + 10, chestY + 2, chestW - 10, chestH);
}

function mainRoomChest() {
  drawChests();
  if (areColliding(playerX, playerY, playerW, playerH, chestX, chestY, chestW, chestH) === true) {
    if (chestUsesLeft > 0) {
      while (healthPotion < 4) {
        givePotions();
      }
    }
    chestUsesLeft = 0;
  }
  image(normalChest, chestX, chestY);
}

/*function roomChest() {
  if (chest === true) {
    drawChests();
    if (areColliding(playerX, playerY, playerW, playerH, chestX, chestY, chestW, chestH) === true) {
      while (healthPotion <= 3) {
        if (chestUsesLeft < 0) {
          givePotions();
        }
        chestUsesLeft = 0;
      }
    }
    image(normalChest, chestX, chestY);
  }
}*/

/** 
 * gives the player potions
*/
function givePotions() {
  healthPotion++;
}

/**
 * uses potions. if the player has more than one potion, they can use potions to heal themselves, 2 hearts.
*/
function usePotions() {
  checkPotionNumber();
  if (checkPotionNumber() === true) {
    if (healthPts < 10) {
      healthPts += 4;
      healthPotion--;
      if (healthPts > 10) {
        healthPts = 10;
      }
    } else if (healthPts >= 10) {
      healthPts += 0;
    }
  }
}

/** checks if the number of potions is more than zero, if it is, the player can use potions to heal themselves,
*otherwise they won't be able to use any potions.
*/
function checkPotionNumber() {
  if (healthPotion >= 1) {
    return true;
  }
}

/**
 *  checks if the game is over
*/
function checkGameover() {
  if (healthPts <= 0) {
    gameOver = true;
  }
  if (bossHealth <= 0) {
    gameOver = true;
  }
}

/**
 * determines how the boss moves
*/
function bossMovement() {
  chooseRoomPosition();
  bossX += bossSpeedX;
  bossY += bossSpeedY;
  if (bossY <= 0 || bossY >= height - 90) {
    bossSpeedY *= -1;
  }
  if (bossX <= 0 || bossX >= width - 180) {
    bossSpeedX *= -1;
  }
  if (bossRoom === -5) {
    image(bossR, bossX, bossY);
  } else if (bossRoom === 5) {
    image(bossL, bossX, bossY);
  }
  if (bossHealth <= 25) {
    bossSpeedX * 2;
    bossSpeedY * 2;
  } else if (bossHealth <= 10) {
    bossSpeedX * 2;
    bossSpeedY * 2;
  }
}

/** draws the player
*/
function moveSprite() {
  getHit();
  if (left === true) {
    image(red, playerX, playerY, 31, 38, 0, 0, 31, 38);
    xDirection = -1;
  } else if (right === true) {
    image(red, playerX, playerY, 31, 38, 31, 0, 31, 38);
    xDirection = 1;
  } else if (up === true) {
    if (xDirection === -1) {
      image(red, playerX, playerY, 31, 38, 0, 0, 31, 38);
    } else if (xDirection === 1) {
      image(red, playerX, playerY, 31, 38, 31, 0, 31, 38);
    }
  } else if (down === true) {
    if (xDirection === -1) {
      image(red, playerX, playerY, 31, 38, 0, 0, 31, 38);
    } else if (xDirection === 1) {
      image(red, playerX, playerY, 31, 38, 31, 0, 31, 38);
    }
  }
  if (xDirection === -1) {
    image(red, playerX, playerY, 31, 38, 0, 0, 31, 38);
  } else if (xDirection === 1) {
    image(red, playerX, playerY, 31, 38, 31, 0, 31, 38);
  }
}

/**
 * Draws the hearts remaing for the player until game over
*/
function drawHearts() {
  if (healthPts === 10) {
    image(heart, heartX, heartY, 98, 16, 0, 0, 49, 8);
  } else if (healthPts === 9) {
    image(heart, heartX, heartY, 98, 16, 49, 0, 49, 8);
  } else if (healthPts === 8) {
    image(heart, heartX, heartY, 98, 16, 98, 0, 49, 8);
  } else if (healthPts === 7) {
    image(heart, heartX, heartY, 98, 16, 147, 0, 49, 8);
  } else if (healthPts === 6) {
    image(heart, heartX, heartY, 98, 16, 196, 0, 49, 8);
  } else if (healthPts === 5) {
    image(heart, heartX, heartY, 98, 16, 245, 0, 49, 8);
  } else if (healthPts === 4) {
    image(heart, heartX, heartY, 98, 16, 294, 0, 49, 8);
  } else if (healthPts === 3) {
    image(heart, heartX, heartY, 98, 16, 343, 0, 49, 8);
  } else if (healthPts === 2) {
    image(heart, heartX, heartY, 98, 16, 392, 0, 49, 8);
  } else if (healthPts === 1) {
    image(heart, heartX, heartY, 98, 16, 441, 0, 49, 8);
  } else {
    image(heart, heartX, heartY, 98, 16, 490, 0, 49, 8);
  }
  noSmooth();
}

/** 
 * Draws the player using the sword
 */
function playerSlash() {
  attack();
  if (playerState === 0) {
    if (xDirection === -1) {
      image(leftSlash, playerX, playerY, 75, 63, (playerState * 75), 0, 75, 63);
    } else if (xDirection === 1) {
      image(rightSlash, (playerX - 25), (playerY - 14), 75, 63, (playerState * 75), 0, 75, 63);
    }
  } else {
    if (xDirection === -1) {
      image(leftSlash, (playerX - 20), (playerY - 14), 75, 63, (Math.floor(playerState) * 75), 0, 75, 63);
      playerState += 0.27;
      if (playerState >= 10) {
        playerState = 0;
      }
    } else if (xDirection === 1) {
      image(rightSlash, (playerX - 24), (playerY - 14), 75, 63, (Math.floor(playerState) * 75), 0, 75, 63);
      playerState += 0.27;
      if (playerState >= 10) {
        playerState = 0;
      }
    }
  }
  noSmooth();
}

function attack() {
  if (areColliding(playerX - 17, playerY + 10, slashW, slashH, testX, testY, testW, testH)) {
    testHealth--;
    if (testHealth <= -20) {
      testX = 600;
      testY = 600;
    }
  }
}

function getHit() {
  if (up === true) {
    yDirection = -1;
  } else if (down === true) {
    yDirection = 1;
  }
  if (areColliding(playerX, playerY, playerW, playerH, testX, testY, testW, testH)) {
    healthPts--;
    if (xDirection === -1){
      playerX += 10;
    } else if (xDirection === 1) {
      playerX -= 10;
    }
    if (yDirection === -1) {
      playerY += 10;
    } else if (yDirection === 1) {
      playerY -= 10;
    }
  }
}

console.log(chooseSide);