let timeLimit = 1;
let countDown;
let gameOver;
let score = 0;
let cleanPoints;
let sink;
let player;
let foodArray = [];

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

 // FOOD SPRITES
 for (i = 0; i < 20; i++) {
    food = new Sprite(random(width*0.4, width*0.7), random(height*0.3, height*0.7), 40);
    food.color = "#F44336";
    foodArray.push(food);
}

    //player
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

function cleanDish(player, food) {
    food.remove();
}

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

     for (let i = 0; i < food.length; i++) {
        if (player.collide(food[i])) {
            cleanDish(player, food[i]);
            cleanPoints++; // Increment the score when food is removed
        }
    }
   
    

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

// function getPoints() {
//     // score = +1
//     text("YAY!", width / 2, height / 2);
// }
