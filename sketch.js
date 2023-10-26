let timeLimit = 1;
let countDown;
let gameOver;
let score = 0;
let cleanPoints;
let sink;
let food;

let speed = 5;
let x = 500;
let y = 600;

let arcadeType;
function preload() {
    arcadeType = loadFont("typeface/arcade-classic.ttf");

}

function setup() {
    createCanvas(1000, 800);

    world.gravity.y = 0;
    world.gravity.x = 0;

    //player
    player = new Sprite();
    player.width = 123;
    player.height = 200;
    player.color = "#9C27B0";
    player.img = "images/hand.png";
    player.x = x;
    player.y = y;
    player.rotationLock = true;

    // //FOOD SPRITES GROUP
    //     food = new Group();
    //     food.diameter = 30;
    //     food.x = () => random(200, 800);
    //     food.y = () => random(100, 500);
    //     food.amount = 80;

    
    // FOOD SPRITES
    for (i = 0; i < 10; i++) {
        virus1 = new Sprite(random(200, 800), random(100, 500), 50, 25);
        virus1.color = "#F44336";

        virus2 = new Sprite(random(width * 0.4, width * 0.6), 300, 30);
        virus2.color = "#03A9F4";

        virus3 = new Sprite(random(width * 0.4, width * 0.6), 300, 30, 50);
        virus3.color = "#FFEB3B";
    }

        // ROTATIONS
        //     if (random(2) < 1) {
        //       dir = 1;
        //     } else {
        //       dir = -1;
        //     }
        //     virus1.rotationSpeed = 2 * dir;

        //     if (random(2) < 1) {
        //       dir = 1;
        //     } else {
        //       dir = -1;
        //     }
        //     virus2.rotationSpeed = 1 * dir;

        //     if (random(2) < 1) {
        //       dir = 1;
        //     } else {
        //       dir = -1;
        //     }
        //     virus3.rotationSpeed = 3 * dir;
    // }

    // player.overlaps(virus1, cleanDish);

    // BOUNDING BOX
    walls = new Group();
    walls.collider = "static";
    ceiling = new walls.Sprite(width / 2, 0, 1000, 1);
    floor = new walls.Sprite(width / 2, height, 1000, 1);
    leftWall = new walls.Sprite(0, height / 2, 1, 800);
    rightWall = new walls.Sprite(width, height / 2, 1, 800);
}  

// function cleanDish() {
//     virus1.remove();
//     virus2.remove();
//     virus3.remove();
// }

function draw() {
    clear();
    // sink = loadImage('images/sink-bg.png');
    background('grey');

    player.moveTowards(mouse);

    //  TIMER
    HTMLCountdown = document.getElementById("countdown");
    HTMLGameover = document.getElementById("gameover");
    HTMLCleanpoints = document.getElementById("cleanpoints");
    let currentTime = int(millis() / 1000);

    countDown = timeLimit - currentTime;
    HTMLCountdown.innerText = `Time: ${countDown}`;

    // gameOver = countDown === 0;
    if (countDown === 0) {
        HTMLGameover.innerText = `Game Over`;
        // text("GAME OVER", width / 2, height / 2);
    }

    //SCORE
    cleanPoints = score;
    HTMLCleanpoints.innerText = `Score: ${cleanPoints}`;
    if (player.collide(virus1, getPoints)) cleanPoints++;

    console.log(cleanPoints);

    //PLATE
    fill("white");
    circle(width / 2, height / 2, 600);
    fill("rgb(230,230,230)");
    circle(width / 2, height / 2, 450);

}

// function keyPressed() {
//     if (keyCode === UP_ARROW && keyIsPressed) {
//         // y -= 10;
//         player.move(50, "up", speed);
//         if (kb.presses("up")) player.rotateTo(0, 10);
//     }
//     if (keyCode === DOWN_ARROW && keyIsPressed) {
//         // y += 10;
//         player.move(50, "down", speed);
//     }
//     if (keyCode === RIGHT_ARROW && keyIsPressed) {
//         // x += 10;
//         player.move(50, "right", speed);
//         if (kb.presses("right")) player.rotateTo(90, 10);
//     }

//     if (keyCode === LEFT_ARROW && keyIsPressed) {
//         // x -= 10;
//         player.move(50, "left", speed);

//         if (kb.presses("left")) player.rotateTo(-90, 10);
//     }
// }

function getPoints() {
    // score = +1
    text("YAY!", width / 2, height / 2);
}
