module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			//	These are the assets we loaded in Boot.js
			this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);
			//this.load.bitmapFont('Upheaval', '/assets/fonts/Upheaval/upheavtt.ttf', 'assets/fonts/Upheaval/upheaval.xml');
			//	Here we load the rest of the assets our game needs.
			//	As this is just a Project Template I've not provided these assets, swap them for your own.
			
			//	+ lots of other required assets here

			this.load.image('puzzle', 'assets/hill.jpg');
			this.load.image('bubble', 'assets/bubble.png');
			this.load.image('star', 'assets/star.png');
			this.load.image('star-10', 'assets/10px-Star.png');

		}

		create() {
			this.game.state.start('Level1', true, false);
			//this.game.state.start('MainMenu');
		}
	}
}
