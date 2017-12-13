const removeSpaceStuff = storage => {
	const screenHeight = document.documentElement.clientHeight;

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

export { removeSpaceStuff, redrawSpaceStuff };
