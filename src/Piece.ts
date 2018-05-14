module MyGame {
    export class Piece {
        x: number;
        y: number;
        img: Phaser.Image;

        constructor (private game: Phaser.Game, private size: number, private text: string) {}

        create () {            
            let bmd = this.game.add.bitmapData(this.size, this.size),
                ctx = bmd.context;
                
            this.draw(ctx);       
            this.img && bmd.draw(this.img, 0, 0, this.size, this.size);
            return this.game.add.sprite(this.x, this.y, bmd);
        }

        draw (ctx: CanvasRenderingContext2D) {
            
            // ctx.lineWidth = 1;
            // ctx.fillStyle = "#eee";
            // ctx.fillRect(0, 0, this.size, this.size);
            // ctx.fillStyle = '#444';
            // ctx.fillText(this.text, this.size/2 - 3, this.size/2);
        }
    }
}