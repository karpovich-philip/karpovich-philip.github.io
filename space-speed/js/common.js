import { main } from './main';
import { defineKey } from './player-control';
import { createSpaceEntity } from './space-entity';
import { createEnemyBullet } from './bullet';
import { playSound } from './sound';


const gameState = {
	storageSpaceStuff:      [],
	storageOfEnemyBullets:  [],
	storageOfPlayerBullets: [],
	lastFire:               Date.now(),
	lastTime:               null,
	gameOver:               null,
	count:                  0,
	score:                  0,
	spaceSpeed:             50,
	entityCreationCycle:    null,
	bulletCreationCycle:    null,
	soundGameBgTalk:        null,
	soundGameBgMusic:       null
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
	defineKey();
	createSpaceEntity();
	createEnemyBullet();
	playSound('game_bg_talk', true);
	playSound('game_bg_music', true);

	document.querySelector('#index').classList.add('hidden');
	document.querySelector('#game').classList.remove('hidden');

	const resetBtn = document.querySelector('.reset_btn');
	const exitBtn = document.querySelector('.exit_btn');
	resetBtn.addEventListener('click', reset);
	exitBtn.addEventListener('click', exit);
	reset();
}

const init = () => {
	main();
	const startBtn = document.querySelector('.start_btn');
	startBtn.addEventListener('click', start);
}

const exit = () => {
	playSound('game_bg_talk', false);
	playSound('game_bg_music', false);
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
	document.querySelector('.player_ship').classList.remove('damaged_player_ship');
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
		playSound('game_bg_talk', true);
	}
	if (!gameState.soundGameBgMusic) {
		playSound('game_bg_music', true);
	}
}

init();

export { gameState };
