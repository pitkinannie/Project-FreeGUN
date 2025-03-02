class Laser {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.speed = 15;
        this.angle = angle;
        this.width = 20;
        this.height = 4;
        this.damage = 25;
    }
    
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
    
    checkCollision(enemy) {
        const dx = this.x - enemy.x;
        const dy = this.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 30; // Simple circular collision
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw laser beam
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        // Draw glow effect
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ff6666';
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        ctx.restore();
    }
}
