//declaring variables
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//determine random time
const randomTime = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

//determine random hole
const randomHole = (holes) => {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) {
        console.log("same hole, try again")
        return randomHole(holes)
    }
    lastHole = hole;
    return hole;
}

//mole go up
const molePop = () => {
    const time = randomTime(800, 1400);
    const hole = randomHole(holes);

    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            molePop();
        } else {
            console.log("time's up, game over")
        }
    }, time)
}

//start game & rest scoreBoard
const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    molePop();
    setTimeout(() => {
        timeUp = true
    }, 8000)
}

//hit mole
const hit = (event) => {
    console.log("BANG, gotcha");
    score++;
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', hit))