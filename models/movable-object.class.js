class MovableObject {
    x = 120
    y = 280
    heigt = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    
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

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
        
    }
}