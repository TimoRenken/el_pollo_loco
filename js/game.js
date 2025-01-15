let canvas;
let world;
let keyboard = new Keyboard(); 

let intervalIds = [];

/**
 * This wrapper function is used to save the id from a interval.
 * Id is the id of the interval.
 * @param {*} fn  // function to be called
 * @param {*} time // time interval
 */
function setStoppableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function startGame(){
    document.getElementById('overlay').style.display = 'none';
    initLevel();
    init();
}

/**
 * This function stops the game.
 */
function stopGame(){
    intervalIds.forEach(clearInterval)
}


function init(){
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard);

}

window.addEventListener('keydown', (event) =>{
   
    if(event.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38){
        keyboard.UP = true;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(event.keyCode == 68){
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) =>{
    if(event.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38){
        keyboard.UP = false;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(event.keyCode == 68){
        keyboard.D = false;
    }
})
