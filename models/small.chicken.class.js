class SmallChicken extends MovableObject {
    y = 390;
    height = 35;
    width = 40;
    HP = 5;
    chick_died_sound = new Audio('audio/smallChicken.mp3');
    soundPlayed = false; // Flag to check if sound has been played

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 3500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        sounds.push(this.chick_died_sound);
    }

    animate() {
        const move = setInterval(() => {
            if (!isPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!isPaused) {
                if (this.isDead()) { // checks if HP is <= 0
                    if (!this.soundPlayed) {
                        this.chick_died_sound.play(); // Play sound only once
                        this.soundPlayed = true; // Mark sound as played
                    }
                    this.loadImage(this.IMAGE_DEAD);
                    clearInterval(move); // stops chicken walking
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 200);
    }
}
