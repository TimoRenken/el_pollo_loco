class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerleration = 2.5;
    HP = 100;
    lastHit = 0;

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

    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall.
            return true;
        } else {
            if (this.y >= 280) {
                this.y = 280; // Korrigiere die Position, falls der Charakter unter den Boden gefallen ist.
                return false;
            }
            return true;
        }
    }

    isColliding(mo) { // mo = movableObject
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Right -> Left
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Top -> Bottom
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&    // Left -> Right
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;     // Bottm -> Top
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
            this.HP -= 5;
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