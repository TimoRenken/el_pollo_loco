class Coin extends MovableObject {
    y = 340;
    height = 100;
    width = 100;

    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };

    collect_coin = new Audio('audio/coin.mp3')

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 100 + Math.random() * 3500;
        this.y = 140 + Math.random() * (340 - 140);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!isPaused) {
                this.playAnimation(this.IMAGES);
            }
        }, 300);
    }
}