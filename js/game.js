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
        if (!isPaused) fn(); // Call function only if game is not paused
    }, time);
    intervalIds.push(id);
}

function startGame() {
    document.getElementById('start_screen').style.display = 'none';
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
    pauseIcon = document.getElementById('toggle_pause');

    if (isPaused) {
        isPaused = false;
        pauseIcon.innerHTML = "pause";
        world.character.applyGravity(); // Resume gravity
    } else {
        isPaused = true;
        pauseIcon.innerHTML = "play_arrow";
        world.character.stopGravity(); // Stop gravity
    }
}

/**
 * this function is called when the character dies.
 */
function loseGame() {
    stopGame();
    document.getElementById('lose_screen').style.display = "flex";
}

/**
 * this function is called when the character wins.
 */
function winGame(){
    stopGame();
    document.getElementById('win_screen').style.display = "flex";
}

/**
 * This function restarts the game.
 */
function newGame() {
    stopGame();    // // Stop all intervals
    document.getElementById('lose_screen').style.display = "none";
    document.getElementById('win_screen').style.display = "none";
    world.character.collectedBottles = 0; // Reset the number of collected bottlesd
    initLevel();   // Reinitialize the game
    init();
    checkMute();
}


/**
 * This function toggles the sound.
 */
function toggleMute() {
    soundIcon = document.getElementById('toggle_sound');

    if(!isMuted) {
        soundIcon.innerHTML = "volume_off";
        sounds.forEach(sound => sound.muted = true);
        isMuted = true;

    } else {
        soundIcon.innerHTML = "volume_up";
        sounds.forEach(sound => sound.muted = false);
        isMuted = false;
    }
}

/**
 * This function checks if the game is muted.
 */
function checkMute(){
    if(isMuted){
        sounds.forEach(sound => sound.muted = true);
    } else {
        sounds.forEach(sound => sound.muted = false);
    }
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}
