class Bottle extends MovableObject {
    y = 360;
    height = 70;
    width = 60;
    collect_bottle = new Audio('audio/collect.mp3');

    offset = {
        top: 10,
        right: 0,
        bottom: 5,
        left: 15
    };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 3500;
        this.animate();
        sounds.push(this.collect_bottle);
    }


    /**
     * This function animates the collectable bottles.
     */
    animate() {
        setStoppableInterval(() => {
            if (!isPaused) {
                this.playAnimation(this.IMAGES);
            }
        }, 500);
    }
}