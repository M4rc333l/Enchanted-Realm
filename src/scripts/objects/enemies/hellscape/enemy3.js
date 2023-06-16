import Enemy from '../../enemy.js';

export default class Enemy3 extends Enemy {
    constructor(config, randomX, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this._y = 200;
        this.randomX = randomX;
    }

    moveAlgorithm(time, delta) {
        this.flipX = this.x < this.player.x;
        this._x = this.randomX;
        this._x += 0.3;
        this._y -= 0.8;
        this.setPosition(this._x, this._y);
    }
}