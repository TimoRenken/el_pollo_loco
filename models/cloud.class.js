class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.10;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
    }
}
