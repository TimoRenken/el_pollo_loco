class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerleration = 2.5;
    HP = 100;
    lastHit = 0;

    /**
     * This function is used to add gravity to objects.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accerleration;
            } else {
                this.speedY = 0; // Resets speedY after reaching the ground.
            }
        }, 1000 / 30);
    }

    /**
     * This function checks whether the object is above the ground
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall.
            return true;
        } else {
            if (this.y >= 280) {
                this.y = 280; // Corrects the position if the character has fallen below the ground.
                return false;
            }
            return true;
        }
    }

    isColliding(mo, attackRange = false) { 
        let horizontalOverlap = 
            this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        let verticalOverlap = 
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    
        if (attackRange) {
            let distance = Math.abs(this.x - mo.x);
            return horizontalOverlap && distance < 250; // Attack within 250px range
        }
    
        return horizontalOverlap && verticalOverlap;
    }
    

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    };

    hit() {
        if (!world.character.invincible) {
            this.HP -= 20;
            if (this.HP < 0) {
                this.HP = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit // difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.HP <= 0;
    }
}