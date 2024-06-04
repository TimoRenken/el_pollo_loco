class MovableObject {
    x = 120
    y = 250
    img;
    heigt = 150;
    width = 100;

    
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