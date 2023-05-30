import Enemy from '../../enemy.js';

export default class Glurak extends Enemy {
    constructor(config, fellows, player, image) {
        super(config, fellows, player, image);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.counter = 0;
    }

    moveAlgorithm() {


        //TODO Bildschrimrand höhe und breite abfragen -> methode dafür suchen neu
        this._x = this.player.x + 102;


        setTimeout( () => {
            let x = Phaser.Math.Between(0, 1);

            if(x == 0){
                this._yo += 2;
            }
            else if(x == 1){
                this._yo -= 2;
            }
        }, 2000);


        this.setPosition(this._x, this._yo);

    }

}