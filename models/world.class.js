class World {
    character = new Character();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBarHealth();
    coinBar = new StatusBarCoins();
    bottleBar = new StatusBarBottles();
    endbossBar = new StatusBarEndboss();
    throwableObjects = [];
    collectableObject = new CollectableObjects();
    coin = new Coin();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        // Space for fixed Objects
        this.ctx.translate(-this.camera_x, 0); // Backward
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.collectableObjects);
        this.ctx.translate(-this.camera_x, 0);

        // repeats draw()
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);       draws a reactangle for collision
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addStatusBars(){
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollection();
        }, 10)
        setInterval(() => {
            this.checkThrowObjects();
        }, 150)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            // Check if character is jumping on an enemy
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.killEnemy(enemy);
                this.character.speedY = 20;
            } 
            // Check if enemy hits character and character is not hurt
            else if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.HP);
            }
    
            // Check if any throwable object collides with the enemy
            this.throwableObjects.forEach((throwableObject) => {
                if (throwableObject.isColliding(enemy)) {
                    throwableObject.splash();
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
                }
            });
        });
    }

    killEnemy(enemy) {
            this.character.invincible = true; 
            enemy.HP = 0;
            setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
            this.character.invincible = false;
        }, 400)
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            let xOffset = 50;
            if (this.character.otherDirection) xOffset = -30; // sets the correct start point on the x axis when otherDirection is true.

            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--;
            this.bottleBar.percentage -= 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
        }
    }

    /**
    * This function checks if the character is colliding an object
    */
    checkCollection() {
        this.level.collectableObjects.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                this.collectItem(obj);
            }
        });
    }

    /**
     * This function is used to collect a bottle or coin an deleting it in level
     * @param {*} obj 
     */
    collectItem(obj) {
        if (obj instanceof Coin) {
            this.coin.collect_coin.play();
            this.character.collectedCoins++; // increase collectedCoins by 1 after collecting a coin
            this.coinBar.percentage += 10;
            this.coinBar.setPercentage(this.character.collectedCoins); // set imagepath by collectedCoins 
            this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1) // Remove the coin from array
        } else if (obj instanceof Bottle) {
            this.character.collectedBottles++; // increase collectedBottles by 1 after collecting a bottle
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
            this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1)
        }
    }


}