class MovableObject {
    x = 120
    y = 400
    img;

    
    loadImage(path){           // loadImage('img/test.png')
        this.img= new Image(); // this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){
        
    }
}