class Chicken extends MovableObject {
    y = 380;
    height = 50;
    width = 60;
    HP = 20;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {

        const move = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        const animation = setInterval(() => {
            if (this.isDead()) { // checks if HP is <= 0
                this.loadImage(this.IMAGE_DEAD);
                clearInterval(move); // stops chicken walking 
            } else
                this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


}