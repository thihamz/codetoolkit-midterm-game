let timeLimit = 8;
let countDown;
let gameOver;
let score = 0;
let cleanPoints;
let sink;
let player;
let foodArray = [];
let foodArray2 = []
let winSound;
let loseSound;
let scrubSound;

let speed = 5;
let x = 500;
let y = 700;

let arcadeType;

function preload() {
    arcadeType = loadFont("typeface/arcade-classic.ttf");
    soundFormats('mp3');
    cheerSound = loadSound('sounds/cheerSound.mp3');
    soundFormats('mp3');
    loseSound = loadSound('sounds/loseSound.mp3');
    soundFormats('mp3');
    scrubSound = loadSound('sounds/scrubSound.mp3')
}

function setup() {
    createCanvas(1000, 800);

    world.gravity.y = 0;
    world.gravity.x = 0;

    // FOOD SPRITES
    for (i = 0; i < 15; i++) {
        food = new Sprite(random(width * 0.4, width * 0.7), random(height * 0.3, height * 0.7), 40);
        food.img = "images/ketchup.png"
        food.color = "#F44336";
        foodArray.push(food);
        tint(255, 200); // Display at half opacity
    }

    //PLAYER
    player = new Sprite();
    player.width = 100;
    player.height = 180;
    player.color = "#9C27B0";
    player.img = "images/hand.png";
    player.x = x;
    player.y = y;
    player.rotationLock = true;


    player.overlaps(food, cleanDish);

    // BOUNDING BOX
    walls = new Group();
    walls.collider = "static";
    ceiling = new walls.Sprite(width / 2, 0, 1000, 1);
    floor = new walls.Sprite(width / 2, height, 1000, 1);
    leftWall = new walls.Sprite(0, height / 2, 1, 800);
    rightWall = new walls.Sprite(width, height / 2, 1, 800);
}


function cleanDish(player, foodItem) {
    // Remove the food item from the canvas
    let index = foodArray.indexOf(foodItem);
    if (index !== -1) {
        foodArray.splice(index, 1);
        foodItem.remove(); // Assuming you have a remove() method in your Sprite class
        score++; // Increment the score
        scrubSound.play();
    }
}

function draw() {
    clear();
    // sink = loadImage('images/sink-bg.png');

    // player.moveTowards(mouse);


    //TIMER
    HTMLCountdown = document.getElementById("countdown");
    HTMLGameover = document.getElementById("gameover");
    HTMLCleanpoints = document.getElementById("cleanpoints");
    HTMLYouwin = document.getElementById("youwin");
    let currentTime = int(millis() / 1000);

    // countDown = timeLimit - currentTime;
    countDown = max(0, timeLimit - int(millis() / 1000));
    HTMLCountdown.innerText = `Time: ${countDown}`;

    //GAMEOVER
    if (countDown === 0) {
        HTMLGameover.innerText = `Game Over`;
        remove();
        loseSound.play();
    }

    //YOU WIN
    if(score === 15){
        HTMLYouwin.innerText = 'YOU WIN';
        remove();
        cheerSound.play();
    }

    //SCORE
    cleanPoints = score;
    HTMLCleanpoints.innerText = `Score: ${cleanPoints}`
    // Check for overlaps between player and food items in the foodArray

    for (let i = foodArray.length - 1; i >= 0; i--) {
        let foodItem = foodArray[i];
        if (player.overlap(foodItem)) {
            // Player and food[i] overlap, update the score and remove the food item
            cleanDish(player, foodItem);
            
        }
    }

    console.log(cleanPoints);

    //PLATE
    fill("white");
    circle(width / 2, height / 2, 600);
    fill("rgb(230,230,230)");
    circle(width / 2, height / 2, 450);
}

function keyPressed() {
    if (keyCode === UP_ARROW && keyIsPressed) {
        // y -= 10;
        player.move(50, "up", speed);
        if (kb.presses("up")) player.rotateTo(0, 10);
    }
    if (keyCode === DOWN_ARROW && keyIsPressed) {
        // y += 10;
        player.move(50, "down", speed);
    }
    if (keyCode === RIGHT_ARROW && keyIsPressed) {
        // x += 10;
        player.move(50, "right", speed);
        if (kb.presses("right")) player.rotateTo(90, 10);
    }

    if (keyCode === LEFT_ARROW && keyIsPressed) {
        // x -= 10;
        player.move(50, "left", speed);

        if (kb.presses("left")) player.rotateTo(-90, 10);
    }
}