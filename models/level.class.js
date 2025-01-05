class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 4125;
    collectableObjects;

    constructor(enemies, clouds, backgroundObjects, collectableObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}