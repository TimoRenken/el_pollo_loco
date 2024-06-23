class MovableObject {
    x = 120
    y = 280
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0
    accerleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.accerleration;
            }
        }, 1000 / 30);
    }

    isAboveGround(){
        return this.y < 180
    }
    

    loadImage(path){           // loadImage('img/test.png')
        this.img= new Image(); // this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }
/**
 * 
 * @param {arr} array - ['img/2_character_pepe/2_walk/W-21.png,' 'img/2_character_pepe/2_walk/W-22.png, ...]
 */
    loadImages(arr){
       arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
       });
        
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    };


}