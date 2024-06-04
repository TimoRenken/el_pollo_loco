class World{
    charakter = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;

    constructor(canvas){
       this.ctx = canvas.getContext('2d');
       this.draw();
    }

    draw(){
        this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, this.charakter.width , this.charakter.heigt)
    }
}