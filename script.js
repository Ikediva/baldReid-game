
// Setup canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Game variables
let balls = [];
let ballImages = [
    "ball_1.png",
    "ball_2.png",
    "ball_3.png",
    "ball_4.png",
    "ball_5.png"
]; // Add your image names here
let score = 0;

// Load images
const loadedImages = ballImages.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Ball class
class Ball {
    constructor(x, y, sizeIndex) {
        this.x = x;
        this.y = y;
        this.sizeIndex = sizeIndex;
        this.image = loadedImages[sizeIndex];
        this.speed = 2;
    }

    draw() {
        ctx.drawImage(this.image, this.x - 32, this.y - 32, 64, 64);
    }

    update() {
        this.y += this.speed;
    }
}

// Spawn a new ball
function spawnBall() {
    const sizeIndex = Math.floor(Math.random() * ballImages.length);
    const x = Math.random() * (canvas.width - 64) + 32;
    balls.push(new Ball(x, -50, sizeIndex));
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw balls
    balls.forEach((ball, index) => {
        ball.update();
        ball.draw();

        // Remove off-screen balls
        if (ball.y > canvas.height) {
            balls.splice(index, 1);
        }
    });

    // Draw score
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Start the game
setInterval(spawnBall, 1000); // Spawn a ball every second
gameLoop();
