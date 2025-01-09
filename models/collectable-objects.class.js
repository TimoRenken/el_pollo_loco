class CollectableObjects extends DrawableObject {
collectedCoins = 0;
collectedBottles = 0;

    constructor(){
        super();
    }

    collect() {
        this.collectedCoins += 10;
        if (this.collectedCoins >100) {
            this.collectedCoins =100;
    };
    }
}