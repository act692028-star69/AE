// game.js

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; // lățime canvas
canvas.height = 600; // înălțime canvas

// Game variables
let keys = {};
let gravity = 0.5;

// Player objects
const players = [
  {
    x: 100,
    y: 500,
    width: 50,
    height: 50,
    color: 'blue',
    dx: 0,
    dy: 0,
    speed: 5,
    jumpPower: 12,
    onGround: false
  },
  {
    x: 600,
    y: 500,
    width: 50,
    height: 50,
    color: 'red',
    dx: 0,
    dy: 0,
    speed: 5,
    jumpPower: 12,
    onGround: false
  }
];

// Platforms (insule)
const platforms = [
  {x: 50, y: 550, width: 300, height: 20},   // prima insulă
  {x: 450, y: 500, width: 300, height: 20}   // a doua insulă
];

// Keyboard input
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Update function
function update() {
  // Player 1 controls: WASD
  if(keys['a']) players[0].dx = -players[0].speed;
  else if(keys['d']) players[0].dx = players[0].speed;
  else players[0].dx = 0;

  if(keys['w'] && players[0].onGround){
    players[0].dy = -players[0].jumpPower;
    players[0].onGround = false;
  }

  // Player 2 controls: Arrow keys
  if(keys['ArrowLeft']) players[1].dx = -players[1].speed;
  else if(keys['ArrowRight']) players[1].dx = players[1].speed;
  else players[1].dx = 0;

  if(keys['ArrowUp'] && players[1].onGround){
    players[1].dy = -players[1].jumpPower;
    players[1].onGround = false;
  }

  // Apply gravity and move players
  players.forEach(player => {
    player.dy += gravity;
    player.x += player.dx;
    player.y += player.dy;

    // Collision with platforms
    player.onGround = false;
    platforms.forEach(plat => {
      if(player.x < plat.x + plat.width &&
         player.x + player.width > plat.x &&
         player.y < plat.y + plat.height &&
         player.y + player.height > plat.y) {
        // Simple collision from top
        if(player.dy > 0){
          player.y = plat.y - player.height;
          player.dy = 0;
          player.onGround = true;
        }
      }
    });

    // Boundaries
    if(player.x < 0) player.x = 0;
    if(player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if(player.y + player.height > canvas.height){
      player.y = canvas.height - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  });
}

// Draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw platforms
  platforms.forEach(plat => {
    ctx.fillStyle = 'green';
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  });

  // Draw players
  players.forEach(player => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  });
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
