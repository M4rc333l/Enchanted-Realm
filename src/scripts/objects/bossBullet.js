import Enemy from './enemy.js';

export default class BossBullet extends Enemy {
    constructor(config, image, xSpawn, ySpawn) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this._x = xSpawn;
        this._y = ySpawn;
    }

    moveAlgorithm(time, delta) {
        this._x -= 5;
        this.setPosition(this._x, this._y);
    }
}