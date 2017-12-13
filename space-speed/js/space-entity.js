import { gameState } from './common';
import { removeSpaceStuff } from './space-stuff';
import { getTopPosOfEntity } from './data';


class SpaceEntity {
	constructor(id, generalClass, personalClass, left, top) {
		this.id = id;
		this.generalClass = generalClass;
		this.personalClass = personalClass;
		this.left = left;
		this.top = top;
	}

	addEntity() {
		const newEntity = document.createElement('div');
		newEntity.id = gameState.count;
		newEntity.classList.add(this.generalClass);
		newEntity.classList.add(this.personalClass);
		newEntity.style.left = this.left;
		newEntity.style.top = this.top;
		return newEntity;
	}
}

const createSpaceEntity = () => {
	const loop = 500;
	const classOfEntity = ['big_meteor', 'small_meteor', 'ufo', 'enemy_ship'];

	gameState.entityCreationCycle = setInterval(() => {
		const maxClientWidth = document.documentElement.clientWidth;

		if (gameState.spaceSpeed < 600) {
			gameState.spaceSpeed += 1;
		}

		const leftPos = Math.floor(Math.random() * (maxClientWidth - 155)) + 'px';
		const typoOfEntity = Math.floor(Math.random()*4);
		const entity = new SpaceEntity(
			gameState.count,
			'space_entity',
			classOfEntity[typoOfEntity],
			leftPos,
			'-111px'
		);
		gameState.storageSpaceStuff.push(entity.addEntity());
		document.querySelector('.space_stuff').appendChild(gameState.storageSpaceStuff[gameState.storageSpaceStuff.length - 1]);
		gameState.count++;

		removeSpaceStuff(gameState.storageSpaceStuff);
		removeSpaceStuff(gameState.storageOfPlayerBullets);
		removeSpaceStuff(gameState.storageOfEnemyBullets);
		getTopPosOfEntity('space_entity', gameState.storageSpaceStuff);
	}, loop)
}

export { SpaceEntity, createSpaceEntity };
