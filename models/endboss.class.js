class Endboss extends MovableObject {
    y = 235;
    height = 200;
    width = 200;
    HP = 100
    speed = 25;
    hurt_sound = new Audio('audio/endbossHurt.mp3');

    offset = {
        top: 80,
        right: 20,
        bottom: 0,
        left: 10
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4000; // 4000
        this.animate();
        this.applyGravity();

    }

    animate() {
        let i = 0;

        setStoppableInterval(() => {
            if(!isPaused) {
            if (world.character.x > 3600 && !world.character.hadFirstContact) { // Checks if character is near the endboss
                world.character.hadFirstContact = true;
            }

            if (world.character.hadFirstContact) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (i < 7) {
                    this.playAnimation(this.IMAGES_ALERT); // Shows alert animation for the first 7 frames
                    i++;
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.hurt_sound.play();
                } else if (this.isColliding(world.character, true)) { 
                    this.playAnimation(this.IMAGES_ATTACK); // Performs attack when the character is within range
                } else {
                    this.bossMoves();
                }
            }
        }
        }, 225);
    }

    bossMoves() {
        if (!this.isHurt() && !this.isDead()) {
            if (world.character.x > this.x) { // Checks if chracter is on the right side
                this.otherDirection = true; // Endboss looks to the right
                this.moveRight();
            } else {
                this.otherDirection = false; // Endboss looks to the left
                this.moveLeft();
            }
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
    
}

