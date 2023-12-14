let timeLimit = 8;
let countDown;
let gameOver;
let score = 0;
let cleanPoints;
let sink;
let player;
let foodArray = [];
let foodArray2 = [];
let winSound;
let loseSound;
let scrubSound;

let pauseState = false;
let gameState = true;
let hasScored = false;

let handpose;
let video;
let predictions = [];
let thumb = [];
let index = [];
let ready = false;
let indexX;
let indexY;

let speed = 5;
let x = 500;
let y = 700;

let arcadeType;

function preload() {
    arcadeType = loadFont("typeface/arcade-classic.ttf");
    soundFormats('mp3');
    cheerSound = loadSound('sounds/cheerSound.mp3');
    loseSound = loadSound('sounds/loseSound.mp3');
    scrubSound = loadSound('sounds/scrubSound.mp3');
}

let sec = 0;
let timerInterval = setInterval(() => {
    sec++;
}, 1000);

function gameSetup(state) {
    if (state === 'after') {
        setTimeout(() => {
            sec = 0;
            // FOOD SPRITES
            for (let i = 0; i < 15; i++) {
                let food = new Sprite(random(width * 0.4, width * 0.7), random(height * 0.3, height * 0.7), 40);
                food.img = "images/ketchup.png";
                food.color = "#F44336";
                foodArray.push(food);
                tint(255, 200); // Display at half opacity
            }

            HTMLYouwin.style.display = 'none';
            pauseState = false;
            gameState = true;
            timeLimit--;
        }, 2000);
    } else {
        // FOOD SPRITES
        for (let i = 0; i < 15; i++) {
            let food = new Sprite(random(width * 0.4, width * 0.7), random(height * 0.3, height * 0.7), 40);
            food.img = "images/ketchup.png";
            food.color = "#F44336";
            foodArray.push(food);
            tint(255, 200); // Display at half opacity
        }
    }
}

function setup() {
    createCanvas(1000, 800);

    // Assuming there is a global "world" variable
    world.gravity.y = 0;
    world.gravity.x = 0;

    // PLAYER
    player = new Sprite();
    player.width = 100;
    player.height = 180;
    player.color = "#9C27B0";
    player.img = "images/hand.png";
    player.x = x;
    player.y = y;
    player.rotationLock = true;

    gameSetup();

    // BOUNDING BOX
    let walls = new Group();
    walls.collider = "static";
    let ceiling = new walls.Sprite(width / 2, 0, 1000, 1);
    let floor = new walls.Sprite(width / 2, height, 1000, 1);
    let leftWall = new walls.Sprite(0, height / 2, 1, 800);
    let rightWall = new walls.Sprite(width, height / 2, 1, 800);

    video = createCapture(VIDEO);
    video.size(width, height);

    handpose = ml5.handpose(video, modelReady);

    handpose.on("predict", (results) => {
        predictions = results;
    });

    video.hide();
}

function cleanDish(player, foodItem) {
    // Remove the food item from the canvas
    let index = foodArray.indexOf(foodItem);
    if (index !== -1) {
        foodArray.splice(index, 1);
        foodItem.remove();
        score++; // Increment the score
        scrubSound.play();
    }
    hasScored = true;
}

let levelCount = 1;

function modelReady() {
    console.log("Model ready!");
    ready = true;
}

function draw() {
    clear();
    drawKeypoints();

    if(ready){
        console.log(indexX, indexY)
    }
    
    player.x = mouseX;
    player.y = mouseY;
    sink = loadImage('images/sink-bg.png');
    player.moveTowards(mouse);
    countDown = max(0, timeLimit - sec);

    // TIMER
    HTMLCountdown = document.getElementById("countdown");
    HTMLGameover = document.getElementById("gameover");
    HTMLCleanpoints = document.getElementById("cleanpoints");
    HTMLYouwin = document.getElementById("youwin");
    let currentTime = int(millis() / 1000);

    if (pauseState === true) {
        HTMLCountdown.innerText = `Time: GO GO GO!!!`;
    } else {
        HTMLCountdown.innerText = `Time: ${countDown}`;
    }

    // GAMEOVER
    if (countDown === 0) {
        HTMLGameover.innerText = `Game Over`;
        HTMLYouwin.style.display = 'none';
        remove();
        loseSound.play();
    }

    // NEXT LEVEL
    if (score % 15 === 0 && score !== 0 && gameState === true && hasScored === true) {
        hasScored = false;
        pauseState = true;
        gameState = false;
        HTMLYouwin.style.display = 'block';
        levelCount++;
        HTMLYouwin.innerText = `LEVEL ${levelCount}`;
        cheerSound.play();
        gameSetup('after');
    }

    // SCORE
    cleanPoints = score;
    HTMLCleanpoints.innerText = `Score: ${cleanPoints}`;

    // Check for overlaps between player and food items in the foodArray
    for (let i = foodArray.length - 1; i >= 0; i--) {
        let foodItem = foodArray[i];
        if (player.overlap(foodItem)) {
            // Player and food[i] overlap, update the score and remove the food item
            cleanDish(player, foodItem);
        }
    }

    // PLATE
    fill("white");
    circle(width / 2, height / 2, 600);
    fill("rgb(230,230,230)");
    circle(width / 2, height / 2, 450);

    
}

function keyPressed() {
    if (keyCode === UP_ARROW && keyIsPressed) {
        player.move(50, "up", speed);
        if (kb.presses("up")) player.rotateTo(0, 10);
    }
    if (keyCode === DOWN_ARROW && keyIsPressed) {
        player.move(50, "down", speed);
    }
    if (keyCode === RIGHT_ARROW && keyIsPressed) {
        player.move(50, "right", speed);
        if (kb.presses("right")) player.rotateTo(90, 10);
    }

    if (keyCode === LEFT_ARROW && keyIsPressed) {
        player.move(50, "left", speed);
        if (kb.presses("left")) player.rotateTo(-90, 10);
    }
}

function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];

        thumb = prediction.annotations.thumb[3];
        index = prediction.annotations.indexFinger[3];

        ellipse(thumb[0], thumb[1], 10, 10);
        ellipse(index[0], index[1], 10, 10);
    }
    if (ready && thumb.length > 2 && index.length > 2) {
         indexX = index[0]
         indexY = index[1]
        // console.log(distance)
        console.log(predictions);
    }
}