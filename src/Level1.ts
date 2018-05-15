module MyGame {

	export class Level1 extends Phaser.State {
		boardDimension: number[] = MyGame.tileDim;
		tileSize: number = MyGame.tileSize;
		tiles: Phaser.Sprite[] = [];
		tween: Phaser.Tween;
		particleEmmitter: Phaser.Particles.Arcade.Emitter;
		solved: boolean = false;
		completeExplosionCount: number = 0;
		create() {
			let arr: MyGame.Piece[] = [],
				counter = 0,
				shuffled: MyGame.Piece[] = [],
				puzzle: Phaser.Image,
				pieceObj: MyGame.Piece;

			this.stage.backgroundColor = '#ffffff';
			
			
			for (let i=0;i<this.boardDimension[0];i++) {
				for (let j=0;j<this.boardDimension[1];j++) {
					pieceObj = new MyGame.Piece(this.game, this.tileSize, (++counter).toString(), [j, i]);
					puzzle = this.add.sprite(-1000, -1000, 'puzzle');
					puzzle.crop(new Phaser.Rectangle(i * this.tileSize, j * tileSize, this.tileSize, this.tileSize));
					//pieceObj.img = puzzle;
					arr.push(pieceObj);
				}				
			}
			
			shuffled = this.shuffle(arr);
			shuffled.forEach((item, i) => {
				item.y = Math.floor(i/this.boardDimension[0]) * this.tileSize;
				item.x = i%this.boardDimension[0] * this.tileSize;				
				if (i !== shuffled.length - 1) {
					this.initTile(item.create());
				}
			});

			this.addButtons();
			this.initParticles();
		}

		update () {
			if (this.isSolved()) {
				this.completed();
			}
		}


		initParticles () {
			this.physics.startSystem(Phaser.Physics.ARCADE);

			this.stage.backgroundColor = 0x337799;

			this.particleEmmitter = this.add.emitter(0, 0, 100);
			this.particleEmmitter.makeParticles('star-10');		
		}

		particleBurst (pointer: any) {

			//  Position the emmitter where the mouse/touch event was
			this.particleEmmitter.x = pointer.x;
			this.particleEmmitter.y = pointer.y;
		
			//  The first parameter sets the effect to "explode" which means all particles are emitted at once
			//  The second gives each particle a 2000ms lifespan
			//  The third is ignored when using burst/explode mode
			//  The final parameter (10) is how many particles will be emitted in this single burst
			this.particleEmmitter.start(true, 5000, null, 10 + Math.random() * 20);
		
		}

		addButtons () {

		}

		completed () {
			var burst = () => {
				this.particleBurst({
					x: Math.random() * this.tileSize * this.boardDimension[0],
					y: Math.random() * this.tileSize * 2
				});
			}
			if (!this.solved) {
				// Immediate initial burst
				burst();burst();burst();
			}
			if (this.completeExplosionCount > 5) return;
			this.solved = true;
			this.completeExplosionCount++;
			var explosions = 1
			
			for (let i = 0; i < explosions; i++) {
				let timer = this.time.events.add(Phaser.Timer.SECOND * Math.random() * 5, function () {			
					burst();
					this.completeExplosionCount--;
				}, this);
			}
			
		}

		isSolved () {
			return this.tiles.every(tile => {
				let pos = this.findPos(tile);
				return tile.data.piece.position[0] == pos[0] && tile.data.piece.position[1] == pos[1]; 
			});
		}

		initTile (tile: Phaser.Sprite) {			
			tile.inputEnabled = true;
			tile.events.onInputDown.add(this.onTileClick, this);
			tile.input.useHandCursor = true;	
			this.tiles.push(tile);
		}

		onTileClick (sprite: Phaser.Sprite) {
			let pos = this.tileCanMove(sprite);
			if (pos && !this.solved && !(this.tween && this.tween.isRunning)) {
				this.tween = this.add.tween(sprite).to({
					x: pos[0] * this.tileSize, 
					y: pos[1] * this.tileSize
				}, 300, Phaser.Easing.Linear.None, false, 15);				
				this.tween.start();
			}			
		}

		shuffle (array: MyGame.Piece[]) {			
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;
		}

		findPos (tile: Phaser.Sprite) {
			let x = tile.x/this.tileSize;
			let y = tile.y/this.tileSize;
			return [x, y];
		}

		getTileAtPos(pos: number[]) {
			const filtered = this.tiles.filter(tile => tile.x === pos[0] * this.tileSize && tile.y === pos[1] * this.tileSize)
			return filtered.length ? filtered[0] : null;
		}

		tileCanMove (tile: Phaser.Sprite) {
			const pos = this.findPos(tile);
			const positions = [];
			let canMovePos: number[] = null;
			let left = false,
				right = false,
				up = false,
				down = false;
			if (pos[0] > 0) {
				left = true;
				positions.push([pos[0] - 1, pos[1]]);
			}
			if (pos[0] < this.boardDimension[0] - 1) {
				right = true;
				positions.push([pos[0] + 1, pos[1]]);
			}
			if (pos[1] > 0) {
				up = true;
				positions.push([pos[0], pos[1] - 1]);
			}
			if (pos[1] < this.boardDimension[1] - 1) {
				down = true;
				positions.push([pos[0], pos[1] + 1]);
			}

			positions.forEach(p => {
				const t = this.getTileAtPos(p);
				if (!t) {
					canMovePos = p;
				}
			});
			return canMovePos;
		}
	}
} 