import { gameState } from './common';
import { movePlayerShip } from './player-control';
import { checkCollisionWithShip, checkCollisionPlayerBulletWithEntity } from './collisions';


const main = () => {
	const now = Date.now();
	const timePassed = (now - gameState.lastTime) / 1000;

	draw(timePassed);
	movePlayerShip();
	checkCollisionWithShip(gameState.storageSpaceStuff, '.space_stuff');
	checkCollisionWithShip(gameState.storageOfEnemyBullets, '.enemy_bullets');
	checkCollisionPlayerBulletWithEntity();

	gameState.lastTime = now;
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
	const bulletSpeed = 1000;

	for (let i = 0; i < gameState.storageSpaceStuff.length; i++) {
		gameState.storageSpaceStuff[i].style.top =
			gameState.storageSpaceStuff[i].getBoundingClientRect().top + timePassed * gameState.spaceSpeed + 'px';
	}
	for (let i = 0; i < gameState.storageOfPlayerBullets.length; i++) {
		gameState.storageOfPlayerBullets[i].style.top =
			gameState.storageOfPlayerBullets[i].getBoundingClientRect().top - timePassed * bulletSpeed + 'px';
	}
	for (let i = 0; i < gameState.storageOfEnemyBullets.length; i++) {
		gameState.storageOfEnemyBullets[i].style.top =
			gameState.storageOfEnemyBullets[i].getBoundingClientRect().top + timePassed * bulletSpeed + 'px';
	}
}

export { main };
