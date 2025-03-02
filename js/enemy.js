class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.health = 100;
        this.width = 40;
        this.height = 40;
    }
    
    update(player) {
        // Move towards player
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const angle = Math.atan2(dy, dx);
        
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }
    
    draw(ctx) {
        ctx.save();
        
        // Draw enemy body
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw health bar
        const healthBarWidth = 40;
        const healthBarHeight = 4;
        const healthPercentage = this.health / 100;
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - 30, healthBarWidth, healthBarHeight);
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - 30, healthBarWidth * healthPercentage, healthBarHeight);
        
        ctx.restore();
    }
}
