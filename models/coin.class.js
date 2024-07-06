class Coin extends MovableObject{
    y = 340
    height = 100
    width = 100


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 100 + Math.random() * 1900;
        this.y = 140 + Math.random() * (340 - 140);
        this.animate();
    }

    animate(){
        setInterval(()=>{
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}