class Bottle extends MovableObject{
    y = 350;
    height = 80;
    width = 70;

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]
    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 1800;
        this.animate();
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}