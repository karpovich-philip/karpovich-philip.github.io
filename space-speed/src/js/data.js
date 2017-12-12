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

export { getTopPosOfEntity };
