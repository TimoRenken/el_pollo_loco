let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let sounds = [];
isPaused = false;
isMuted = false;
backgroundMusic = new Audio('audio/backgroundMusic.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;
winSound = new Audio('audio/winSound.mp3');
loseSound = new Audio('audio/loseSound.mp3');



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    pushSounds();
}


/**
 * This wrapper function is used to save the id from an interval.
 * Id is the id of the interval.
 * @param {*} fn  // function to be called
 * @param {*} time // time interval
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if (!isPaused) fn(); // Call function only if game is not paused
    }, time);
    intervalIds.push(id);
    return id; // returns the intervals id. This is used to stop dead chickens from walking
}


/**
 * This function is starting the game
 */
function startGame() {
    document.getElementById('start_screen').style.display = 'none';
    document.getElementById('game_infos').style.display = "none";
    initLevel();
    init();
    backgroundMusic.play();
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
    this.loseSound.play();
    document.getElementById('lose_screen').style.display = "flex";
}


/**
 * this function is called when the character wins.
 */
function winGame(){
    stopGame();
    this.winSound.play();
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
    checkMute();// checks if the sound is muted.  
}


/**
 *  This function pushes sounds to the sound array.
 */
function pushSounds() {
    sounds.push(backgroundMusic);
    sounds.push(winSound);
    sounds.push(loseSound);
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


/**
 * This function shows the game infos.
 */
function openGameInfos(){
    document.getElementById('game_infos').style.display = "flex";
}


/**
 * This function closes the game infos.
 */
function  closeGameInfos(){
    document.getElementById('game_infos').style.display = "none";
}
