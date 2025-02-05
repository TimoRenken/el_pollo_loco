class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    DOWN = false;
    D = false;

    constructor() {
        this.buttonTouchStartEvent();
        this.buttonTouchEndEvent();
    }


    /**
     * This function is needed to make it possible to play on a touch device.
     * when the user touches the screen the event checks if the id of the target is equal to the id of the buttons id.
     */
    buttonTouchStartEvent() {
        window.addEventListener('touchstart', (event) => {

            if (event.target.id == 'btn_right') {
                keyboard.RIGHT = true;
            }
            if (event.target.id == 'btn_left') {
                keyboard.LEFT = true;
            }
            if (event.target.id == 'btn_jump') {
                keyboard.SPACE = true;
            }
            if (event.target.id == 'btn_throw') {
                keyboard.D = true;
            }
        });
    }


    /**
     * This function ends the interaction with the touch device.
     */
    buttonTouchEndEvent() {
        window.addEventListener('touchend', (event) => {

            if (event.target.id == 'btn_right') {
                keyboard.RIGHT = false;
            }
            if (event.target.id == 'btn_left') {
                keyboard.LEFT = false;
            }
            if (event.target.id == 'btn_jump') {
                keyboard.SPACE = false;
            }
            if (event.target.id == 'btn_throw') {
                keyboard.D = false;
            }
        });
    }
}


/**
 * This EventListener checks if a key is pressed
 */
window.addEventListener('keydown', (event) => {

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})


/**
 * This EventListener checks if a key is no longer pressed.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})


