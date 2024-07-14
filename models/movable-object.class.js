class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerleration = 2.5;
    HP = 100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accerleration;
            }
        }, 1000 / 30);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall.
            return true;
        } else
            return this.y < 280;
    }

    isColliding (mo) { // mo = movableObject
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Right -> Left
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Top -> Bottom
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&    // Left -> Right
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;     // Bottm -> Top

}
    // isColliding(mo) { // mo = movableObject
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height;
    // }

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
        this.HP -= 5;
        if (this.HP < 0) {
            this.HP = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.HP <= 0;
    }
    
    
}