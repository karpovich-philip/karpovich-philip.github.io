/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameState", function() { return gameState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_control__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__space_entity__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bullet__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sound__ = __webpack_require__(1);






let gameState = {
     storageSpaceStuff: [],
     storageOfEnemyBullets: [],
     storageOfPlayerBullets: [],
     lastFire: Date.now(),
     lastTime: null,
     gameOver: null,
     count: 0,
     score: 0,
     spaceSpeed: 50,
     entityCreationCycle: null,
     bulletCreationCycle: null,
     soundGameBgTalk: null,
     soundGameBgMusic: null
}

const start = () => {
    document.querySelector('#game').innerHTML = `
      <section class="playing_field">
        <div class="player_lives slide_right"> 
          <div class="life"></div> 
          <div class="life"></div> 
          <div class="life"></div> 
          <div class="life"></div>
          <div class="life"></div>
        </div>
        <a href="#" class="reset_btn btn slide_left">reset</a>
        <a href="#" class="exit_btn btn slide_left">exit</a>
        <h3 class="score slide_left">0</h3>
        <div class="space_ship player_ship"></div>
        <div class="space_stuff"></div>
        <div class="player_bullets"></div>
        <div class="enemy_bullets"></div>
      </section>
      `
    gameState.lastTime = Date.now();
    Object(__WEBPACK_IMPORTED_MODULE_1__player_control__["a" /* defineKey */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__space_entity__["a" /* createSpaceEntity */])();
    Object(__WEBPACK_IMPORTED_MODULE_3__bullet__["b" /* createEnemyBullet */])();
    Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_talk', true);
    Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_music', true);

    document.querySelector('#index').classList.add('hidden');
    document.querySelector('#game').classList.remove('hidden');

    let resetBtn = document.querySelector('.reset_btn');
    let exitBtn = document.querySelector('.exit_btn');
    resetBtn.addEventListener('click', reset);
    exitBtn.addEventListener('click', exit);
    reset();
}

const init = () => {
    Object(__WEBPACK_IMPORTED_MODULE_0__main__["a" /* main */])();
    let startBtn = document.querySelector('.start_btn');
    startBtn.addEventListener('click', start);
}

const exit = () => {
    Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_talk', false);
    Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_music', false);
    window.clearInterval(gameState.entityCreationCycle);
    window.clearInterval(gameState.bulletCreationCycle);
    document.querySelector('#game').classList.add('hidden');
    document.querySelector('#game_over').classList.add('hidden');
    document.querySelector('#index').classList.remove('hidden');
}

const reset = () => {
    document.querySelector('.exit_btn').classList.remove('pulse');
    document.querySelector('.reset_btn').classList.remove('pulse');
    document.querySelector('.space_stuff').innerHTML = '';
    document.querySelector('.enemy_bullets').innerHTML = '';
    document.querySelector('.player_bullets').innerHTML = '';
    document.querySelector('.score').innerHTML = '0';
    document.querySelector('#game_over').classList.add('hidden');
    document.querySelector('.player_ship').style.top = document.documentElement.clientHeight - 100 + 'px';
    document.querySelector('.player_ship').style.left = document.documentElement.clientWidth / 2 - 50 + 'px';
    document.querySelector('.player_lives').innerHTML = `
      <div class="life"></div> 
      <div class="life"></div> 
      <div class="life"></div> 
      <div class="life"></div>
      <div class="life"></div>
    `;
    gameState.storageSpaceStuff = [];
    gameState.storageOfEnemyBullets = [];
    gameState.storageOfPlayerBullets = [];
    gameState.count = 0;
    gameState.score = 0;
    gameState.spaceSpeed = 50;
    gameState.gameOver = false;

    if (!gameState.soundGameBgTalk) {
        Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_talk', true);
    }
    if (!gameState.soundGameBgMusic) {
        Object(__WEBPACK_IMPORTED_MODULE_4__sound__["a" /* playSound */])('game_bg_music', true);
    }
}

init();




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return playSound; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);



const playSound = (sound, play) => {
    if (__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].gameOver) return;

    if (sound === 'game_bg_talk' && !play) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgTalk.pause();
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgTalk = false;
        return;
    }

    if (sound === 'game_bg_music' && !play) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgMusic.pause();
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgMusic = false;
        return;
    }

    let audio = new Audio();
    switch (sound) {
        case 'shot':
            audio.src = '../sounds/shot.mp3';
            break;
        case 'final_crash':
            audio.src = '../sounds/final_crash.mp3';
            break;
        case 'hit':
            audio.src = '../sounds/hit.mp3';
            break;
        case 'damage_playership':
            audio.src = '../sounds/damage_playership.mp3';
            break;
        case 'game_bg_talk':
            audio.src = '../sounds/game_bg_talk.mp3';
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgTalk = audio;
            break;
        case 'game_bg_music':
            audio.src = '../sounds/game_bg_music.mp3';
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].soundGameBgMusic = audio;
            break;
    }
    audio.play();
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return movePlayerShip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defineKey; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sound__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(3);





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

    if (!spaceShip || __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].gameOver) return;

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

    if (input.isDown('SPACE') && Date.now() - __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].lastFire > 200) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].lastFire = Date.now();
        let playerShip = document.querySelector('.player_ship');
        let scoreField = document.querySelector('.score');

        if (__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score > 0) {
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score -= 100;
        }
        scoreField.innerHTML = __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score;

        Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('shot');
        Object(__WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* createBullet */])(playerShip, __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets, '.player_bullets');
    }
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Bullet */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createBullet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createEnemyBullet; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(4);




class Bullet {
    constructor(generalClass, typeOfBulletClass, left, top) {
        this.generalClass = generalClass;
        this.typeOfBulletClass = typeOfBulletClass;
        this.left = left;
        this.top = top;
    }

    addBullet() {
        let bullet = document.createElement('div');
        bullet.style.left = this.left + 'px';
        bullet.style.top = this.top + 'px';
        bullet.classList.add(this.generalClass);
        bullet.classList.add(this.typeOfBulletClass);
        return bullet;
    }
}

const createBullet = (ship, storage, cls) => {
    if (!ship) return;

    let shipData = ship.getBoundingClientRect();

    let bullet = new Bullet(
        'bullet',
        ship.classList.contains('player_ship') ? 'player_bullet' : 'enemy_bullet',
        Math.floor((shipData.left + shipData.right) / 2 - 4),
        shipData.top
    );

    storage.push(bullet.addBullet());
    document.querySelector(cls).appendChild(storage[storage.length - 1]);

    Object(__WEBPACK_IMPORTED_MODULE_1__data__["a" /* getTopPosOfEntity */])(cls, storage);
}

const createEnemyBullet = () => {
    __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].bulletCreationCycle = setInterval(() => {
        let enemyShip = document.querySelectorAll('.enemy_ship');

        for (let i = 0; i < enemyShip.length; i++) {
            createBullet(enemyShip[i], __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets, '.enemy_bullets');
        }
    }, 2000);
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getTopPosOfEntity; });
const getTopPosOfEntity = (entity, storage) => {
    let spaceEntity = document.getElementsByClassName(entity);

    for (let i = 0; i < spaceEntity.length; i++) {
        for (let n = 0; n < storage.length; n++) {
            if (parseInt(spaceEntity[i].id) === storage[n].id) {
                storage[n].top = spaceEntity[i].style.top;
            }
        }
    }
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeSpaceStuff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return redrawSpaceStuff; });
const removeSpaceStuff = storage => {
    let screenHeight = document.documentElement.clientHeight;

    for (let i = 0; i < storage.length; i++) {
        if (storage[i].classList.contains('space_entity')) {
            if (storage[i].getBoundingClientRect().top >= screenHeight) {
                storage.splice(0, 1);
                redrawSpaceStuff(storage, '.space_stuff');
            }
        } else if (storage[i].classList.contains('player_bullet')) {
            if (storage[i].getBoundingClientRect().top < 0) {
                storage.splice(0, 1);
                redrawSpaceStuff(storage, '.player_bullets');
            }
        } else if (storage[i].classList.contains('enemy_bullet')) {
            if (storage[i].getBoundingClientRect().top >= screenHeight) {
                storage.splice(0, 1);
                redrawSpaceStuff(storage, '.enemy_bullets');
            }
        }
    }
}

const redrawSpaceStuff = (storage, cls) => {
    document.querySelector(cls).innerHTML = '';

    for (let i = 0; i < storage.length; i++) {
        document.querySelector(cls).appendChild(storage[i]);
    }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return main; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_control__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collisions__ = __webpack_require__(7);





const main = () => {
    let now = Date.now();
    let timePassed = (now - __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].lastTime) / 1000;

    draw(timePassed);
    Object(__WEBPACK_IMPORTED_MODULE_1__player_control__["b" /* movePlayerShip */])();
    Object(__WEBPACK_IMPORTED_MODULE_2__collisions__["b" /* checkCollisionWithShip */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff, '.space_stuff');
    Object(__WEBPACK_IMPORTED_MODULE_2__collisions__["b" /* checkCollisionWithShip */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets, '.enemy_bullets');
    Object(__WEBPACK_IMPORTED_MODULE_2__collisions__["a" /* checkCollisionPlayerBulletWithEntity */])();

    __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].lastTime = now;
    requestAnimationFrame(main);
}

const requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 50);
        };
})();

const draw = timePassed => {
    let bulletSpeed = 1000;

    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.length; i++) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff[i].style.top =
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff[i].getBoundingClientRect().top + timePassed * __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].spaceSpeed + 'px';
    }
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets.length; i++) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets[i].style.top =
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets[i].getBoundingClientRect().top - timePassed * bulletSpeed + 'px';
    }
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets.length; i++) {
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets[i].style.top =
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets[i].getBoundingClientRect().top + timePassed * bulletSpeed + 'px';
    }
}




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkCollisionWithShip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkCollisionPlayerBulletWithEntity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sound__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__score__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__space_stuff__ = __webpack_require__(5);






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
                Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('damage_playership');
                let playerShip = document.querySelector('.player_ship');
                playerShip.classList.add('snake');
                playerShip.classList.add('damaged_player_ship')
                lives[0].remove();
                storage.splice(i, 1);
                Object(__WEBPACK_IMPORTED_MODULE_3__space_stuff__["a" /* redrawSpaceStuff */])(storage, cls);

                setTimeout(function () {
                    playerShip.classList.remove('snake');
                }, 300)
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('damage_playership');
                Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('game_bg_talk', false);
                Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('game_bg_music', false);
                __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].gameOver = true;
                document.querySelector('#game_over').classList.remove('hidden');
                document.querySelector('.final_score').innerHTML = `Your result is ${__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score}`;
                document.querySelector('.exit_btn').classList.add('pulse');
                document.querySelector('.reset_btn').classList.add('pulse');
                return;
            }
        }
    }
}

const checkCollisionPlayerBulletWithEntity = () => {
    if (!__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets.length && !__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.length) return;

    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets.length; i++) {
        let bullet = __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets[i].getBoundingClientRect();

        for (let n = 0; n < __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.length; n++) {
            let entityData = __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff[n].getBoundingClientRect();

            if (
                entityData.left < bullet.right &&
                entityData.right > bullet.left &&
                entityData.bottom > bullet.top &&
                entityData.top < bullet.bottom
            ) {
                Object(__WEBPACK_IMPORTED_MODULE_1__sound__["a" /* playSound */])('hit');
                Object(__WEBPACK_IMPORTED_MODULE_2__score__["a" /* addScore */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff[n]);
                __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets.splice(i, 1);
                __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.splice(n, 1);
                Object(__WEBPACK_IMPORTED_MODULE_3__space_stuff__["a" /* redrawSpaceStuff */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff, '.space_stuff');
                Object(__WEBPACK_IMPORTED_MODULE_3__space_stuff__["a" /* redrawSpaceStuff */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets, '.player_bullets');
            }
        }
    }
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addScore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);



const addScore = entity => {
    if (!entity) return;

    let scoreField = document.querySelector('.score');

    switch (entity.classList[1]) {
        case 'big_meteor':
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score += 200;
            break;
        case 'small_meteor':
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score += 300;
            break;
        case 'ufo':
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score += 500;
            break;
        case 'enemy_ship':
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score += 1000;
            break;
    }
    scoreField.innerHTML = __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].score;
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SpaceEntity */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSpaceEntity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__space_stuff__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(4);





class SpaceEntity {
    constructor(id, generalClass, personalClass, left, top) {
        this.id = id;
        this.generalClass = generalClass;
        this.personalClass = personalClass;
        this.left = left;
        this.top = top;
    }

    addEntity() {
        let newMeteor = document.createElement('div');
        newMeteor.id = __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].count;
        newMeteor.classList.add(this.generalClass);
        newMeteor.classList.add(this.personalClass);
        newMeteor.style.left = this.left;
        newMeteor.style.top = this.top;
        return newMeteor;
    }
}

const createSpaceEntity = () => {
    let loop = 500;
    let classOfEntity = {
        1: 'big_meteor',
        2: 'small_meteor',
        3: 'ufo',
        4: 'enemy_ship'
    };

    __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].entityCreationCycle = setInterval(() => {
        let maxClientWidth = document.documentElement.clientWidth;

        if (__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].spaceSpeed < 600) {
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].spaceSpeed += 1;
        }

        let leftPos = Math.floor(Math.random() * (maxClientWidth - 155)) + 'px';
        let typoOfEntity = Math.floor(Math.random() * (5 - 1) + 1);
        let entity = new SpaceEntity(
            __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].count,
            'space_entity',
            classOfEntity[typoOfEntity],
            leftPos,
            '-111px'
        );
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.push(entity.addEntity());
        document.querySelector('.space_stuff').appendChild(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff[__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff.length - 1]);
        __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].count++;

        Object(__WEBPACK_IMPORTED_MODULE_1__space_stuff__["b" /* removeSpaceStuff */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff);
        Object(__WEBPACK_IMPORTED_MODULE_1__space_stuff__["b" /* removeSpaceStuff */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfPlayerBullets);
        Object(__WEBPACK_IMPORTED_MODULE_1__space_stuff__["b" /* removeSpaceStuff */])(__WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageOfEnemyBullets);
        Object(__WEBPACK_IMPORTED_MODULE_2__data__["a" /* getTopPosOfEntity */])('space_entity', __WEBPACK_IMPORTED_MODULE_0__common__["gameState"].storageSpaceStuff);
    }, loop)
}




/***/ })
/******/ ]);