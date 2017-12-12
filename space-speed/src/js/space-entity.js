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
        let newMeteor = document.createElement('div');
        newMeteor.id = gameState.count;
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

    gameState.entityCreationCycle = setInterval(() => {
        let maxClientWidth = document.documentElement.clientWidth;

        if (gameState.spaceSpeed < 600) {
            gameState.spaceSpeed += 1;
        }

        let leftPos = Math.floor(Math.random() * (maxClientWidth - 155)) + 'px';
        let typoOfEntity = Math.floor(Math.random() * (5 - 1) + 1);
        let entity = new SpaceEntity(
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
