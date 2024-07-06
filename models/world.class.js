class World {
    charakter = new Character();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.charakter.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        

        // space for fixed Objects
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards
       
        this.addToMap(this.charakter);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.coins);
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
        }, 200)
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.charakter.isColliding(enemy) ){
                this.charakter.hit();
                this.statusBar.setPercentage(this.charakter.HP);
            }
        });
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.charakter.x + 100, this.charakter.y + 100);
            this.throwableObjects.push(bottle);
        }
    }
}