let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let sounds = [];
isPaused = false;
isMuted = false;

/**
 * This wrapper function is used to save the id from a interval.
 * Id is the id of the interval.
 * @param {*} fn  // function to be called
 * @param {*} time // time interval
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if (!isPaused) fn(); // Nur ausführen, wenn nicht pausiert
    }, time);
    intervalIds.push(id);
}

function startGame() {
    document.getElementById('overlay').style.display = 'none';
    initLevel();
    init();
}

/**
 * This function stops the game.
 */
function stopGame() {
    intervalIds.forEach(clearInterval)
}

/**
 * This function pauses the game.
 */
function pauseGame() {
    if (isPaused) {
        isPaused = false;
    } else {
        isPaused = true;
    }
}

function toggleMute() {
    icon = document.getElementById('toggle_sound');

    if(!isMuted) {
        icon.innerHTML = "volume_off";
        sounds.forEach(sound => sound.muted = true);
        isMuted = true;

    } else {
        icon.innerHTML = "volume_up";
        sounds.forEach(sound => sound.muted = false);
        isMuted = false;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

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
