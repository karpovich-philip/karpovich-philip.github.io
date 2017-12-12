import { gameState } from './common';
import { playSound } from './sound';
import { addScore } from './score';
import { redrawSpaceStuff } from './space-stuff';


const checkCollisionWithShip = (storage, cls) => {
    if (!storage.length) return;
    let lives = document.querySelector('.player_lives').children;
    let shipData = document.querySelector('.space_ship').getBoundingClientRect();

    for (let i = 0; i < storage.length; i++) {
        let entityData = storage[i].getBoundingClientRect();

        if (
            entityData.left < shipData.right &&
            entityData.right > shipData.left &&
            entityData.bottom > shipData.top &&
            entityData.top < shipData.bottom
        ) {
            if (lives.length) {
                playSound('damage_playership');
                let playerShip = document.querySelector('.player_ship');
                playerShip.classList.add('snake');
                playerShip.classList.add('damaged_player_ship')
                lives[0].remove();
                storage.splice(i, 1);
                redrawSpaceStuff(storage, cls);

                setTimeout(function () {
                    playerShip.classList.remove('snake');
                }, 300)
            } else {
                playSound('damage_playership');
                playSound('game_bg_talk', false);
                playSound('game_bg_music', false);
                gameState.gameOver = true;
                document.querySelector('#game_over').classList.remove('hidden');
                document.querySelector('.final_score').innerHTML = `Your result is ${gameState.score}`;
                document.querySelector('.exit_btn').classList.add('pulse');
                document.querySelector('.reset_btn').classList.add('pulse');
                return;
            }
        }
    }
}

const checkCollisionPlayerBulletWithEntity = () => {
    if (!gameState.storageOfPlayerBullets.length && !gameState.storageSpaceStuff.length) return;

    for (let i = 0; i < gameState.storageOfPlayerBullets.length; i++) {
        let bullet = gameState.storageOfPlayerBullets[i].getBoundingClientRect();

        for (let n = 0; n < gameState.storageSpaceStuff.length; n++) {
            let entityData = gameState.storageSpaceStuff[n].getBoundingClientRect();

            if (
                entityData.left < bullet.right &&
                entityData.right > bullet.left &&
                entityData.bottom > bullet.top &&
                entityData.top < bullet.bottom
            ) {
                playSound('hit');
                addScore(gameState.storageSpaceStuff[n]);
                gameState.storageOfPlayerBullets.splice(i, 1);
                gameState.storageSpaceStuff.splice(n, 1);
                redrawSpaceStuff(gameState.storageSpaceStuff, '.space_stuff');
                redrawSpaceStuff(gameState.storageOfPlayerBullets, '.player_bullets');
            }
        }
    }
}

export { checkCollisionWithShip, checkCollisionPlayerBulletWithEntity };
