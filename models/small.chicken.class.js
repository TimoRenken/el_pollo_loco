class SmallChicken extends MovableObject {
    y = 390;
    height = 35;
    width = 40;
    HP = 5;
    chick_died_sound = new Audio('audio/smallChicken.mp3');
    soundPlayed = false; 

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
        this.x = 400 + Math.random() * 3700;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        sounds.push(this.chick_died_sound);
    }


    /**
     * This function is used to animate a chick which is walking to the left.
     * When the chick died it calls the function chickDied().
     */
    animate() {
        const move = setStoppableInterval(() => {
            if (!isPaused) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (!isPaused) {
                if (this.isDead())
                    this.chickDied(move);
                else
                    this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }


    /**
     * This function is used to show a dead chick.
     * It plays a chick sound and loads a new image.
     * @param {*} move move is the interval that makes the chick run to the left.
     * The interval will be cleared when the chick dies.
     */
    chickDied(move) {
        if (!this.soundPlayed) {
            this.chick_died_sound.play(); 
            this.soundPlayed = true; 
        }

        this.loadImage(this.IMAGE_DEAD);
        clearInterval(move); 
    }
}
