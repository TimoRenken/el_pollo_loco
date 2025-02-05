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


    /**
    * This function pushes all sounds to the soundarray.
    * This is used to make it possible to mute all sounds.
    */
    pushSounds() {
        sounds.push(this.throwing_sound);
        sounds.push(this.broken_glas);
    }

    /**
     * This function transfers the world object to the character object.
     * This is used to make it possible to use the keyboard.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * This function is used to draw all objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);


        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.collectableObjects);
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This function is used to add several objects to the canvas.
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }


    /**
     *  This function is used to add an objects to the canvas.
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     *  This function is used to flip the image of the object.
     * @param {*} mo = MovableObject
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     *  This function is used to flip the image back to the original direction.
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * This function is used to add the statusbars to the game.
     * Shows the endboss statusbar after first contact with the endboss.
     */
    addStatusBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.character.hadFirstContact) {
            this.addToMap(this.endbossBar);
        }
    }


    /**
     * This function starts the collision detection and if its possible to throw a bottle.
     */
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
                if (this.isComingFromAbove()) {
                    this.killEnemy(enemy);
                    this.character.speedY = 20;
                }
                else if (this.isVulnerable()) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.HP);
                }
            }
        });
    }


    /**
     * 
     * @returns if the character is jumping on a enemy.
     */
    isComingFromAbove() {
        return this.character.isAboveGround() && this.character.speedY < 0;
    }


    /**
     * 
     * @returns if an enemy hits the character, who is on the ground and not hurt.
     */
    isVulnerable() {
        return !this.character.isHurt() && this.character.speedY <= 0;
    }


    /**
     * This function checks if a bottle is colliding with an enemy
     */
    checkBottleCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((throwableObject) => {
                if (throwableObject.isColliding(enemy) && !throwableObject.isBroken) {
                    throwableObject.isBroken = true;
                    throwableObject.splash();
                    this.broken_glas.play();
                    this.hitWithBottle(enemy);
                    setTimeout(() => {
                        this.removeBottle(throwableObject);
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
        enemy.hit()
        if (enemy instanceof Endboss) {
            this.endbossBar.setPercentage(enemy.HP);
        } else if (enemy.isDead()) {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }
    }


    /**
     * This function checks if a bottle is colliding with the ground and splashes the bottle.
     */
    checkBottleCollisionWithGround() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.y > 360 && !throwableObject.isSplashing) {
                throwableObject.splash();
                this.broken_glas.play();
                setTimeout(() => {
                    this.removeBottle(throwableObject);
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
        enemy.hit()
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            setTimeout(() => {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1)
            }, 400)
        } else {
            this.endbossBar.setPercentage(enemy.HP);
        }
    }


    /**
     * This function is used to check if its possible to throw a bottle.
     * it is just possible to throw one bottle at a time.
     * to prevent killing the endboss very fast with bottles, the last throw time is saved and the player has to wait 1 secound to throw a new bottle.
     */
    checkThrowObjects() {
        const currentThrowTime = new Date().getTime();
        if (this.canThrowBottle(currentThrowTime)) {
            this.lastThrowTime = currentThrowTime;
            let xOffset = 50;
            if (this.character.otherDirection) xOffset = -30;
            this.throwBottle(xOffset);
        }
    }

    /**
     * @param {*} currentThrowTime 
     * @returns if the key D is pressed, the last throw time is more than 1 secound ago and there is no bottle flying
     */
    canThrowBottle(currentThrowTime) {
        return this.keyboard.D && this.character.collectedBottles > 0 && !this.isBottleActive() && currentThrowTime - this.lastThrowTime >= 1000;
    }


    /**
     * This function throws a bottle
     * also it sets the correct imagepath for the statusbar
     * @param {*} xOffset sets the correct start point on the x-axis 
     */
    throwBottle(xOffset) {
        let bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 50);
        this.throwableObjects.push(bottle);
        this.character.collectedBottles--;
        this.bottleBar.percentage -= 20;
        this.bottleBar.setPercentage(this.character.collectedBottles);
        this.throwing_sound.play();
    }


    /**
    * This function checks if the character is colliding an object.
    * Also checks if all bottles are collected and spawn new bottles after first contact with the endboss
    */
    checkCollection() {
        this.level.collectableObjects.forEach((obj) => {
            if (this.character.isColliding(obj)) {
                this.collectItem(obj);
            }
        });

        const remainingBottles = this.level.collectableObjects.filter(obj => obj instanceof Bottle);
        if (remainingBottles.length === 0 && this.character.hadFirstContact) {
            this.spawnNewBottles();
        }
    }


    /**
     * This function is used to spawn new bottles when all bottles are collected
     * (add new bottles to collectable objects)
     */
    spawnNewBottles() {
        const positions = [2700, 2900, 3100, 3300, 3500];
        const newBottles = positions.map(x => new Bottle(x, 350));
        this.level.collectableObjects.push(...newBottles);
    }


    /**
     * This function is used to collect a bottle or coin.
     * @param {*} obj 
     */
    collectItem(obj) {
        if (obj instanceof Coin) {
            this.collectCoin(obj);
        } else if (this.canCollectBottle(obj)) {
            this.collectBottle(obj);
        }
    }


    /**
     * This function plays a coin sound, and set a new imagepath for the coin statusbar.
     * Also remove the coin from the game.
     * @param {*} obj object
     */
    collectCoin(obj) {
        this.coin.collect_coin.play();
        this.character.collectedCoins++;
        this.coinBar.percentage += 10;
        this.coinBar.setPercentage(this.character.collectedCoins);
        this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1);
    }

    /**
     * 
     * @param {*} obj object
     * @returns is its possible to pick up a bottle.
     */
    canCollectBottle(obj) {
        return obj instanceof Bottle && this.character.collectedBottles < 5
    }


    /**
     * This function plays a bottle collect sound and set a new imagepath for the bottle statusbar.
     * Also remove the bottle from the game.
     * @param {*} obj object 
     */
    collectBottle(obj) {
        this.bottle.collect_bottle.play();
        this.character.collectedBottles++;
        this.bottleBar.percentage += 20;
        this.bottleBar.setPercentage(this.character.collectedBottles);
        this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1)
    }


}