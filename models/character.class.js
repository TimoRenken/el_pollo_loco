class Character extends MovableObject {
    width = 100;
    height = 150;
    y = 280;
    speed = 5;
    collectedCoins = 0;
    collectedBottles = 0;
    world;
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    snore_sound = new Audio('audio/snoring.mp3');
    deadAnimationPlayed = false;
    hadFirstContact = false;
    hurtSoundPlayed = false;

    offset = {
        top: 50,
        right: 25,
        bottom: 5,
        left: 20
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.pushSounds();
        this.applyGravity();
        this.animate();
    }

    /**
     * This function pushes all sounds to the soundarray.
     * This is used to make it possible to mute all sounds.
     */
    pushSounds() {
        sounds.push(this.walking_sound);
        sounds.push(this.jumping_sound);
        sounds.push(this.hurt_sound);
        sounds.push(this.snore_sound);
    }

    /**
     * this function calls all movement animations in different speeds
     */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);

        setStoppableInterval(() => this.animateCharacter(), 50);

        setStoppableInterval(() => this.animateIdleCharacter(), 200)
    }

    /**
     * This function is used to move the character.
     * CameraOffset is used to make it possibile to run to the worlds end.
     */
    moveCharacter() {
        if (!isPaused && !this.isDead()) {
            this.walking_sound.pause();
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();

            let cameraOffset = Math.min(Math.max(-this.x + 200, -(4200 - this.world.canvas.width)), 0);
            this.world.camera_x = cameraOffset;
        }
    }


    /**
     * 
     * @returns if character can move to the right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * This function is used to move the character to the right. 
     * Super is using moveRight() in moveable Objects.
     * Also it plays the walking sound.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) this.walking_sound.play();
    }

    /**
     * 
     * @returns if character can move to the left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }


    /**
     * This function is used to move the character to the left.
     * Super is using moveRight() in moveable objects.
     * Also it plays the walking sound.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) this.walking_sound.play();
    }


    /**
     * 
     * @returns if character can jump
     * Does not allow jumping while in the air.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * This function is used to let the character jump
     * Super is using jump() in moveable objects.
     * Also plays the jump sound
     */
    jump() {
        super.jump();
        this.jumping_sound.play();
    }


    /**
     * This function is used to animate the character.
     * When the character is dead, the game ends after 1 secound.
     */
    animateCharacter() {
        if (!isPaused) {
            if (this.isDead() && !this.deadAnimationPlayed) {
                this.deadAnimation();
                setTimeout(() => loseGame(), 1000);
            } else if (this.isHurt())
                this.hurtAnimation();
            else if (this.isAboveGround())
                this.playAnimation(this.IMAGES_JUMPING);
            else {
                if (this.isWalking())
                    this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    /**
     * 
     * @returns if the character is walking to the left or right
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * This function animates an idle character by using the time the character stands still.
     * If lastStand is not defined, null, undefined, 0, false, NaN or an empty string. lastStand will set by using new Date().
     * When timeStanding is more than 4 secounds, the character begins to sleep.
     */
    animateIdleCharacter() {
        let now = new Date().getTime();

        if (this.isStanding()) {
            if (!this.lastStand) {
                this.lastStand = now;
            }
            let timeStanding = now - this.lastStand;

            if (timeStanding >= 4000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.snore_sound.play();
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        } else {
            this.lastStand = null;
            this.snore_sound.pause();
        }
    }


    /**
     * 
     * @returns if character is standing 
     */
    isStanding() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
     * this function is called when the character is hurt
     * it plays the hurt animation and the hurt sound
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.hurtSoundPlayed) {
            this.hurt_sound.play();
            this.hurtSoundPlayed = true;
            setTimeout(() => {
                this.hurtSoundPlayed = false;
            }, 2000);
        }
    }


    /**
     * this function is called when the character is dead
     * it plays the dead animation and sets the deadAnimationPlayed flag to true
     */
    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.deadAnimationPlayed = true;
        }, this.IMAGES_DEAD.length * 200);
    }

}