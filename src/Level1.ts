module MyGame {

	export class Level1 extends Phaser.State {
		boardDimension: number[] = MyGame.tileDim;
		tileSize: number = MyGame.tileSize;
		tiles: Phaser.Sprite[] = [];
		tween: Phaser.Tween;
		create() {
			let arr: MyGame.Piece[] = [],
				counter = 0,
				shuffled: MyGame.Piece[] = [],
				puzzle: Phaser.Image,
				pieceObj: MyGame.Piece;

			this.stage.backgroundColor = '#ffffff';
			
			
			for (let i=0;i<this.boardDimension[0];i++) {
				for (let j=0;j<this.boardDimension[1];j++) {
					pieceObj = new MyGame.Piece(this.game, this.tileSize, (++counter).toString());
					puzzle = this.add.sprite(-1000, -1000, 'puzzle');
					puzzle.crop(new Phaser.Rectangle(i * this.tileSize, j * tileSize, this.tileSize, this.tileSize));
					pieceObj.img = puzzle;
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
		}

		initTile (tile: Phaser.Sprite) {			
			tile.inputEnabled = true;
			tile.events.onInputDown.add(this.onTileClick, this);
			tile.input.useHandCursor = true;	
			
			this.tiles.push(tile);
		}

		onTileClick (sprite: Phaser.Sprite) {
			let pos = this.tileCanMove(sprite);
			if (pos && !(this.tween && this.tween.isRunning)) {
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