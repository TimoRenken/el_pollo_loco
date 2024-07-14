class ThrowableObject extends MovableObject{   
  
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
    }
/**
 * changes coordinates to animate a throwing bottle
 */
    throw(){
        this.speedY = 30;
        this.applyGravity();
        this.animate();
        setInterval(() =>{
            this.x += 10;
        },25);
        
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 75);
    }
}