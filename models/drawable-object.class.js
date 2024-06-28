class DrawableObject extends MovableObject {



    loadImage(path) {           // loadImage('img/test.png')
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }

    /**
     * 
     * @param {arr} array - ['img/2_character_pepe/2_walk/W-21.png,' 'img/2_character_pepe/2_walk/W-22.png, ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}