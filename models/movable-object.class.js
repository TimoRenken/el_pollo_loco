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

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
    }

    moveLeft(){
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 30;
    };


}