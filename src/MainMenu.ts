module MyGame {

	export class MainMenu extends Phaser.State {

		background: Phaser.Sprite;
		backgroundColor: Phaser.Color;
		text: Phaser.Text;
		logo: Phaser.Sprite;
		music: Phaser.Sound;

		create() {

			// this.music = this.add.audio('titleMusic');
			// this.music.play();
			this.stage.setBackgroundColor(0xeeeeee);
			this.text = this.add.text(this.world.centerX, -200, 'Upheaval');
			this.text.anchor.x = 0.5;
			this.text.anchor.y = 0.5;
			this.text.font = 'Arial Black';
			this.text.fontSize = 30;
			this.text.fontWeight = 'bold';
			this.text.fill = '#ec008c';
			
			this.add.tween(this.text).to({ y: 180 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

			this.input.onDown.addOnce(this.fadeOut, this);

		}

		fadeOut() {

			
			var tween = this.add.tween(this.text).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

			tween.onComplete.add(this.startGame, this);

		}

		startGame() {

			//this.music.stop();
			this.game.state.start('Level1', true, false);

		}

	}

}