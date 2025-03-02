const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1280;
canvas.height = 720;

class Game {
    constructor() {
        this.player = new Player(100, canvas.height / 2);
        this.enemies = [];
        this.lasers = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 2000; // 2 seconds
        this.score = 0;
        
        // Load player image
        this.playerImage = new Image();
        this.playerImage.src = 'assets/elon_sprite.png';
        
        // Setup event listeners
        this.setupControls();
        
        // Start game loop
        this.gameLoop();
    }
    
    setupControls() {
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            this.player.aim(mouseX, mouseY);
        });
        
        window.addEventListener('click', () => {
            this.player.shoot(this.lasers);
        });
        
        // WASD controls
        window.addEventListener('keydown', (e) => {
            this.player.handleKeyDown(e.key);
        });
        
        window.addEventListener('keyup', (e) => {
            this.player.handleKeyUp(e.key);
        });
    }
    
    spawnEnemy() {
        const now = Date.now();
        if (now - this.lastSpawnTime > this.spawnInterval) {
            const y = Math.random() * (canvas.height - 50);
            this.enemies.push(new Enemy(canvas.width, y));
            this.lastSpawnTime = now;
            // Increase difficulty
            this.spawnInterval = Math.max(500, this.spawnInterval * 0.95);
        }
    }
    
    update() {
        // Update player
        this.player.update();
        
        // Spawn and update enemies
        this.spawnEnemy();
        this.enemies.forEach((enemy, index) => {
            enemy.update(this.player);
            if (enemy.health <= 0) {
                this.enemies.splice(index, 1);
                this.score += 100;
            }
        });
        
        // Update lasers and check collisions
        this.lasers.forEach((laser, laserIndex) => {
            laser.update();
            
            // Remove lasers that are off screen
            if (laser.x > canvas.width || laser.x < 0 || 
                laser.y > canvas.height || laser.y < 0) {
                this.lasers.splice(laserIndex, 1);
                return;
            }
            
            // Check laser collisions with enemies
            this.enemies.forEach((enemy, enemyIndex) => {
                if (laser.checkCollision(enemy)) {
                    enemy.health -= laser.damage;
                    this.lasers.splice(laserIndex, 1);
                }
            });
        });
    }
    
    draw() {
        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw player
        this.player.draw(ctx, this.playerImage);
        
        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw(ctx));
        
        // Draw lasers
        this.lasers.forEach(laser => laser.draw(ctx));
        
        // Draw score
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${this.score}`, 10, 30);
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start game when assets are loaded
window.onload = () => {
    new Game();
};
