let level1;

function initLevel() {
    let enemies = [];
    let collectableObjects = [];

    // Add multiple Chickens
    for (let i = 0; i < 20; i++) { 
        enemies.push(new Chicken());
    }

    // Add multiple SmallChickens
    for (let i = 0; i < 10; i++) {
        enemies.push(new SmallChicken());
    }

    // Add Endboss
    enemies.push(new Endboss());

    // Add multiple Coins
    for (let i = 0; i < 10; i++) {
        collectableObjects.push(new Coin());
    }

    // Add multiple Bottles
    for (let i = 0; i < 10; i++) {
        collectableObjects.push(new Bottle());
    }

    level1 = new Level(
        enemies,
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 200),
            new Cloud('img/5_background/layers/4_clouds/1.png', 900),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1600),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2300),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3000),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3700)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),
        ],
        collectableObjects
    );
}
