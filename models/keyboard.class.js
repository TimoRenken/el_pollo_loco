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

    buttonTouchStartEvent() {
        window.addEventListener('touchstart', (event) => { // when the user touches the screen

            if (event.target.id == 'btn_right') {  // if the id of the target is equal to the id of the button right      
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

    buttonTouchEndEvent() {
        window.addEventListener('touchend', (event) => { // when the user stops touching the screen

            if (event.target.id == 'btn_right') { // if the id of the target is equal to the id of the button right 
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

window.addEventListener('keydown', (event) => {

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
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

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
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


