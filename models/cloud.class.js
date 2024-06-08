class Cloud extends MovableObject {
    y = 20;
    width = 500;
    heigt = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15; // decreased "x" 0.15px at 60fps
            if (this.x < -450) {
                this.x = 640; 
            }
        }, 1000 / 60);
    }
}
