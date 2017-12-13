import { gameState } from './common';


const playSound = (sound, play) => {
	if (gameState.gameOver) return;

	if (sound === 'game_bg_talk' && !play) {
		gameState.soundGameBgTalk.pause();
		gameState.soundGameBgTalk = false;
		return;
	}

	if (sound === 'game_bg_music' && !play) {
		gameState.soundGameBgMusic.pause();
		gameState.soundGameBgMusic = false;
		return;
	}

	const audio = new Audio();

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
			gameState.soundGameBgTalk = audio;
			break;
		case 'game_bg_music':
			audio.src = '../sounds/game_bg_music.mp3';
			gameState.soundGameBgMusic = audio;
			break;
	}
	audio.play();
}

export { playSound };
