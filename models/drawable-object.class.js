class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * This function is used to show an image
     * loadImage('img/test.png')
     * this.img = document.getElementById('image') <img id="image" src="">
     * @param {*} path 
     */
    loadImage(path) {
        this.img = new Image();
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

    /**
     * This function draws a image on the canves
     * @param {*} ctx context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function is used to draw a rectangle on an object.
     * This is usefull to check the collidings.
     * @param {*} ctx context 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}