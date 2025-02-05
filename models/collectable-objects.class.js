class CollectableObjects extends DrawableObject {
collectedCoins = 0;

    constructor(){
        super();
    }


    /**
     * This function increases the collected coins.
     * This is used to animate the status bar.
     */
    collect() {
        this.collectedCoins += 10;
        if (this.collectedCoins >100) {
            this.collectedCoins =100;
    };
    }
}