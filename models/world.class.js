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
    bottle = new Bottle();
    lastThrowTime = 0;
    throwing_sound = new Audio('audio/throw.mp3')
    broken_glas = new Audio('audio/glassShatter.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.pushSounds();
    }


    pushSounds() {
        sounds.push(this.throwing_sound);
        sounds.push(this.broken_glas);
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


    /**
     *  This function is used to add objects to the map
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);  //     draws a reactangle for collision
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     *  This function is used to flip the image of the object
     * @param {*} mo = MovableObject
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     *  This function is used to flip the image back to the original direction
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * This function is used to add the statusbars to the game.
     */
    addStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.character.hadFirstContact) {   // Shows the endboss statusbar after first contact with the endboss
            this.addToMap(this.endbossBar);
        }
    }


    run() {
        setInterval(() => {
            if (!isPaused) {
                this.checkCollisions();
                this.checkCollection();
            }
        }, 10)
        setInterval(() => {
            if (!isPaused) {
                this.checkThrowObjects();
            }
        }, 150)
    }


    /**
     * This function permanently checks if the is a collision in the game.
     */
    checkCollisions() {
        this.checkCollisionWithEnemy();
        this.checkBottleCollisionWithEnemy();
        this.checkBottleCollisionWithGround();
    }


    /** 
     * This Function is used to check if the character is colliding with an enemy.
     */
    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0) { // Checks if character is jumping on an enemy
                    this.killEnemy(enemy);
                    this.character.speedY = 20;
                }
                else if (!this.character.isHurt() && this.character.speedY <= 0) {   // Checks if enemy hits character who is on the ground and not hurt.
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.HP);
                }
            }
        });
    }


    /**
     * This function checks if a bottle is colliding with an enemy
     */
    checkBottleCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((throwableObject) => {
                if (throwableObject.isColliding(enemy) && !throwableObject.isBroken) {
                    throwableObject.isBroken = true; // Prevents multiple hits
                    throwableObject.splash();
                    this.broken_glas.play();
                    this.hitWithBottle(enemy);
                    setTimeout(() => {
                        this.removeBottle(throwableObject); // Removes the bottle after the hit
                    }, 300)
                }
            });
        });
    }


    /**
    * This function deals damage to an enemy which is hitten by a flying bottle.
    * @param {*} enemy this is the generated enemy.
    */
    hitWithBottle(enemy) {
        enemy.hit() // reduce enemies live by 20 HP per hit.
        if (enemy instanceof Endboss) {
            this.endbossBar.setPercentage(enemy.HP); // reduce live from the endboss statusbar
        } else if (enemy.isDead()) {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1) // deletes the hitted enemy
        }
    }


    /**
     * This function checks if a bottle is colliding with the ground and splashes the bottle.
     */
    checkBottleCollisionWithGround() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.y > 360 && !throwableObject.isSplashing) { // Checks if bottle hits on the ground
                throwableObject.splash();
                this.broken_glas.play();
                setTimeout(() => {
                    this.removeBottle(throwableObject);  // Removes the bottle after the hit       
                }, 300)
            }
        });
    }


    /**
     * 
     * @returns true if a bottle is still flying or splashing
     */
    isBottleActive() {
        return this.throwableObjects.some(
            (bottle) => !bottle.isBroken || bottle.isSplashing
        );
    }


    /**
     * This function is used to remove a bottle from the throwableObjects array
     * @param {*} bottle 
     */
    removeBottle(bottle) {
        const index = this.throwableObjects.indexOf(bottle);
        if (index > -1) {
            this.throwableObjects.splice(index, 1);
        }
    }


    /**
     * Deals damage to an enemy. 
     * When the hitted enemy is a normal or small chicken, it will be deleted after a short killanmiation.
     * @param {*} enemy this is the generated enemy.
     */
    killEnemy(enemy) {
        enemy.hit() // reduce enemies live by 20 HP per hit.
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) { // used for a short killanimation
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
            }, 400)
        } else {
            this.endbossBar.setPercentage(enemy.HP); // reduce live from the endboss statusbar
        }
    }


    /**
     * This function is used to check if its possible to throw a bottle.
     * it is just possible to throw one bottle at a time.
     * to prevent killing the endboss very fast with bottles, the last throw time is saved and the player has to wait 1 secound to throw a new bottle.
     */ 
    checkThrowObjects() {
        const currentThrowTime = new Date().getTime();
        if (this.keyboard.D && this.character.collectedBottles > 0 && !this.isBottleActive() && currentThrowTime - this.lastThrowTime >= 1000) { // checks if the key D is pressed and the last throw time is more than 1 secound ago and there is no bottle flying
            this.lastThrowTime = currentThrowTime; // sets the last throw time to the current time 
            let xOffset = 50;
            if (this.character.otherDirection) xOffset = -30; // sets the correct start point on the x axis when otherDirection is true.

            let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--;
            this.bottleBar.percentage -= 20; // sets percentage to choose the right image at the statusbar
            this.bottleBar.setPercentage(this.character.collectedBottles); // reduces the amount of bottles in the status bar
            this.throwing_sound.play();
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

        // checks if all bottles are collected and spawn new bottles after first contact with the endboss
        const remainingBottles = this.level.collectableObjects.filter(obj => obj instanceof Bottle);
        if (remainingBottles.length === 0 && this.character.hadFirstContact) {
            this.spawnNewBottles();
        }
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
        } else if (obj instanceof Bottle && this.character.collectedBottles < 5) {
            this.bottle.collect_bottle.play();
            this.character.collectedBottles++; // increase collectedBottles by 1 after collecting a bottle
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
            this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1)
        }
    }

    
    /**
     * This function is used to spawn new bottles after all bottles are collected
     */
    spawnNewBottles() {
        const positions = [2700, 2900, 3100, 3300, 3500]; // fixed positions for new bottles
        const newBottles = positions.map(x => new Bottle(x, 350)); // create new bottles at fixed positions
        this.level.collectableObjects.push(...newBottles); // add new bottles to collectable objects
    }
}