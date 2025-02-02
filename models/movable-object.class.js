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
        this.gravityInterval = setStoppableInterval(() => {
            if (!isPaused) { // Apply gravity only if the game is not paused
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.accerleration;
                } else {
                    this.speedY = 0; // Resets speedY after reaching the ground.
                }
            }
        }, 1000 / 30);
    }


    /**
    * Stops the gravity interval. 
    * This is used while the game is paused
    */
    stopGravity() {
        if (this.gravityInterval) {
            clearInterval(this.gravityInterval);
        }
    }


    /**
     * This function checks whether the object is above the ground
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // ThrowableObject should allways fall
        } else if (this instanceof Endboss) {
            return this.y < 235; // The Endboss is above the ground at 235px.
        } else {
            if (this.y >= 280) {
                this.y = 280; // correction if character is below the ground.
                return false;
            }
            return true;
        }
    }


    /**
     * This function is used to check if there is a colliding between objects.
     * @param {*} mo moveable Object
     * @param {*} attackRange is true when the endboss is close to the character.
     * @returns distences 
     */
    isColliding(mo, attackRange = false) {
        let horizontalOverlap =
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        let verticalOverlap =
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        if (attackRange) {
            let distance = Math.abs(this.x - mo.x); // distance between boss and character
            return horizontalOverlap && distance < 250; // Attack within 250px range
        }

        return horizontalOverlap && verticalOverlap;
    }

    /**
     * This function is used to animate movement from objects.
     * @param {*} images 
     */
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


    /**
     * This function reduces the healthpoints of the character or an enemie.
     */
    hit() {
        this.HP -= 20;
        if (this.HP < 0) {
            this.HP = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * 
     * @returns if an object is already hurt and there is one secound passed
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit // difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }


    isDead() {
        return this.HP <= 0;
    }
}