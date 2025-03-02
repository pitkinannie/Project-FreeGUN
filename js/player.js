class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.rotation = 0;
        this.width = 60;
        this.height = 60;
        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.lastShot = 0;
        this.shootDelay = 100; // milliseconds between shots
    }
    
    handleKeyDown(key) {
        switch(key.toLowerCase()) {
            case 'w': this.movement.up = true; break;
            case 's': this.movement.down = true; break;
            case 'a': this.movement.left = true; break;
            case 'd': this.movement.right = true; break;
        }
    }
    
    handleKeyUp(key) {
        switch(key.toLowerCase()) {
            case 'w': this.movement.up = false; break;
            case 's': this.movement.down = false; break;
            case 'a': this.movement.left = false; break;
            case 'd': this.movement.right = false; break;
        }
    }
    
    aim(mouseX, mouseY) {
        this.rotation = Math.atan2(mouseY - this.y, mouseX - this.x);
    }
    
    shoot(lasers) {
        const now = Date.now();
        if (now - this.lastShot > this.shootDelay) {
            const laser = new Laser(
                this.x + Math.cos(this.rotation) * 30,
                this.y + Math.sin(this.rotation) * 30,
                this.rotation
            );
            lasers.push(laser);
            this.lastShot = now;
        }
    }
    
    update() {
        // Update position based on movement
        if (this.movement.up) this.y -= this.speed;
        if (this.movement.down) this.y += this.speed;
        if (this.movement.left) this.x -= this.speed;
        if (this.movement.right) this.x += this.speed;
        
        // Keep player on screen and on left side
        this.x = Math.max(30, Math.min(300, this.x));
        this.y = Math.max(30, Math.min(canvas.height - 30, this.y));
    }
    
    draw(ctx, image) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(image, -this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
    }
}
