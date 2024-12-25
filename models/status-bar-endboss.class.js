class StatusBarEndboss extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
        this.x = 500;
        this.y = 18;
        this.width = 170;
        this.height = 50;
    }

    // setPercentage(x)
    setPercentage(percentage){ 
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()]; // returns imagepath number "0-5" by percentage
        this.img = this.imageCache[path];
    }

/**
 * 
 * @returns number of array image index
 */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}