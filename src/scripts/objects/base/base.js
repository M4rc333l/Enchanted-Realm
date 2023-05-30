import Enemy from '../enemy.js';

export default class Base extends Enemy {
    constructor(config, fellows, player, posX, randomY, image) {
        super(config, fellows, player, image);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.posX = posX;
        this.randomY = randomY;
        this.life1 = 2;

    }

    moveAlgorithm() {
        this.basenlife();

        this._x = this.posX;
        this._yo = this.randomY;

        this.setPosition(this._x, this._yo);
    }
    basenlife() {

        if( this.health === 0 ){
            this.life1--;
            this.scene.registry.events.emit('loseLife');

        }
    }

}