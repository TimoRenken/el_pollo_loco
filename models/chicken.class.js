class Chicken extends MovableObject {
    y = 380;
    height = 50;
    width = 60;
    HP = 20;
    chickenDied_sound = new Audio('audio/chicken.mp3');
    soundPlayed = false; // Flag to check if sound has been played

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
        this.x = 400 + Math.random() * 3700;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        sounds.push(this.chickenDied_sound);
    }

    animate() {
        const move = setStoppableInterval(() => {
            if (!isPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (!isPaused) {
                if (this.isDead())  // checks if HP is <= 0
                    this.chickenDied(move);
                else
                    this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    chickenDied(move) {
        if (!this.soundPlayed) {
            this.chickenDied_sound.play(); // Play sound only once
            this.soundPlayed = true; // Mark sound as played
        }
        
        this.loadImage(this.IMAGE_DEAD);
        clearInterval(move); // stops chicken walking
    }


}