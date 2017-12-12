import { gameState } from './common';
import { playSound } from './sound';
import { createBullet } from './bullet';


const defineKey = () => {
    let pressedKeys = {};

    function setKey(event, status) {
        let code = event.keyCode;
        let key;

        switch (code) {
            case 32:
                key = 'SPACE';
                break;
            case 37:
                key = 'LEFT';
                break;
            case 38:
                key = 'UP';
                break;
            case 39:
                key = 'RIGHT';
                break;
            case 40:
                key = 'DOWN';
                break;
            default:
                key = String.fromCharCode(code);
        }
        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function (e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function (e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function () {
        pressedKeys = {};
    });

    window.input = {
        isDown: function (key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
}

const movePlayerShip = () => {
    let spaceShip = document.querySelector('.space_ship');
    let speed = 10;

    if (!spaceShip || gameState.gameOver) return;

    let coordinates = spaceShip.getBoundingClientRect();

    if (input.isDown('DOWN') || input.isDown('s')) {
        let edgeOfWindow = document.documentElement.clientHeight;

        if (coordinates.bottom < edgeOfWindow) {
            spaceShip.style.top = coordinates.top + speed + 'px';
        }
    }

    if (input.isDown('UP') || input.isDown('w')) {
        if (coordinates.top - speed > 0) {
            spaceShip.style.top = coordinates.top - speed + 'px';
        }
    }

    if (input.isDown('LEFT') || input.isDown('a')) {
        if (coordinates.left - speed > 0) {
            spaceShip.style.left = coordinates.left - speed + 'px';
        }
    }

    if (input.isDown('RIGHT') || input.isDown('d')) {
        let edgeOfWindow = document.documentElement.clientWidth;

        if (coordinates.right + speed < edgeOfWindow) {
            spaceShip.style.left = coordinates.left + speed + 'px';
        }
    }

    if (input.isDown('SPACE') && Date.now() - gameState.lastFire > 200) {
        gameState.lastFire = Date.now();
        let playerShip = document.querySelector('.player_ship');
        let scoreField = document.querySelector('.score');

        if (gameState.score > 0) {
            gameState.score -= 100;
        }
        scoreField.innerHTML = gameState.score;

        playSound('shot');
        createBullet(playerShip, gameState.storageOfPlayerBullets, '.player_bullets');
    }
}

export { movePlayerShip, defineKey };
