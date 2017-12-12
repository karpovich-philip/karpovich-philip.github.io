import { gameState } from './common';


const addScore = entity => {
    if (!entity) return;

    let scoreField = document.querySelector('.score');

    switch (entity.classList[1]) {
        case 'big_meteor':
            gameState.score += 200;
            break;
        case 'small_meteor':
            gameState.score += 300;
            break;
        case 'ufo':
            gameState.score += 500;
            break;
        case 'enemy_ship':
            gameState.score += 1000;
            break;
    }
    scoreField.innerHTML = gameState.score;
}

export { addScore };
