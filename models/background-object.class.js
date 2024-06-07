class BackgroundObject extends MovableObject {

    width = 720
    heigt = 400
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.heigt;
    }
}
