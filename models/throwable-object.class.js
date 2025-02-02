class ThrowableObject extends MovableObject {
    isSplashing = false; // Flag to track if the bottle is currently in splash animation

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    offset = {
        top: 10,
        right: 10,
        bottom: 5,
        left: 15
    };

    
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throwDirection = world.character.otherDirection ? -1 : 1;  // Set flight direction based on character direction
        this.throw();
    }


    /**
     * changes coordinates to animate a throwing bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.movementInterval = setInterval(() => {
            if (!isPaused) {  // Move only if the game is not paused
                this.x += this.throwDirection * 8;
            }
        }, 25);
        this.animate();
    }


    /**
     * This function animates a splashing bottle
     * 
     */
    splash() {
        if (this.isSplashing) return; // Prevents multiple splash animations
        this.isSplashing = true;

        clearInterval(this.movementInterval); // Stops the X-axis movement
        clearInterval(this.rotationInterval); // Stops the rotation

        this.speedY = 0;
        this.speed = 0;
        this.playAnimationOnce(this.IMAGES_BOTTLE_SPLASH);
    }


    animate() {
        this.rotationInterval = setInterval(() => {
            if (!isPaused) {  // Rotate only if the game is not paused
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 75);

    }


    playAnimationOnce(images) {
        let i = 0;
        let interval = setInterval(() => {
            this.img = this.imageCache[images[i]];
            i++;
            if (i >= images.length) {
                clearInterval(interval); // Ends the animation after the last frame
            }
        }, 125);
    }

}