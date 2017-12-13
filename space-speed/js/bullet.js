import { gameState } from './common';
import { getTopPosOfEntity } from './data';


class Bullet {
	constructor(generalClass, typeOfBulletClass, left, top) {
		this.generalClass = generalClass;
		this.typeOfBulletClass = typeOfBulletClass;
		this.left = left;
		this.top = top;
	}

	addBullet() {
		const bullet = document.createElement('div');
		bullet.style.left = this.left + 'px';
		bullet.style.top = this.top + 'px';
		bullet.classList.add(this.generalClass);
		bullet.classList.add(this.typeOfBulletClass);
		return bullet;
	}
}

const createBullet = (ship, storage, cls) => {
	if (!ship) return;

	const shipData = ship.getBoundingClientRect();

	const bullet = new Bullet(
		'bullet',
		ship.classList.contains('player_ship') ? 'player_bullet' : 'enemy_bullet',
		Math.floor((shipData.left + shipData.right) / 2 - 4),
		shipData.top
	);

	storage.push(bullet.addBullet());
	document.querySelector(cls).appendChild(storage[storage.length - 1]);

	getTopPosOfEntity(cls, storage);
}

const createEnemyBullet = () => {
	gameState.bulletCreationCycle = setInterval(() => {
		const enemyShip = document.querySelectorAll('.enemy_ship');

		for (let i = 0; i < enemyShip.length; i++) {
			createBullet(enemyShip[i], gameState.storageOfEnemyBullets, '.enemy_bullets');
		}
	}, 2000);
}

export { Bullet, createBullet, createEnemyBullet };
