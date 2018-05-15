module MyGame {	
	export const tileSize = 80;
	export const tileDim = [5, 6];
	export class Game extends Phaser.Game {

		constructor() {

			super(tileSize*tileDim[0], tileSize*tileDim[1], Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Level1', Level1, false);

			this.state.start('Boot');
		}

	}

}