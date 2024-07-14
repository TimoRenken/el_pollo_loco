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
    throwableObjects = [];
    collectableObject = new CollectableObjects(); 
    
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
        
        // space for fixed Objects
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0); // Forwards
       
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
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run(){
        setInterval(()=> {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollection();
        }, 200)
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy) ){
                this.character.hit();
                this.healthBar.setPercentage(this.character.HP);
            }
        });
    }

    checkThrowObjects(){
        if(this.keyboard.D && this.character.collectedBottles > 0){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--;
            this.bottleBar.percentage -= 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
        }
    }

/**
 * This function checks whether a coin has been collected and changes the statusbar.
 */
    checkCollection(){
        this.level.collectableObjects.forEach((obj) =>{
            if(this.character.isColliding(obj)){
                this.collectItem(obj);
    
            } 
        });
    }

    /**
     * This function is used to collect a bottle or coin an deleting it in level
     * @param {*} obj 
     */
    collectItem(obj){
        if (obj instanceof Coin){
            this.character.collectedCoins ++; // increase collectedCoins by 1 after collecting a coin
            this.coinBar.percentage += 10;
            this.coinBar.setPercentage(this.character.collectedCoins); // set imagepath by collectedCoins 
            this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1) // Remove the coin from array
        } else if (obj instanceof Bottle){
            this.character.collectedBottles++; // increase collectedBottles by 1 after collecting a bottle
            this.bottleBar.percentage += 20;
            this.bottleBar.setPercentage(this.character.collectedBottles);
            this.level.collectableObjects.splice(this.level.collectableObjects.indexOf(obj), 1)
        }
    }


}