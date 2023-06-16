import Enemy from '../../enemy.js';

export default class FireEnemy extends Enemy {
    constructor(config, spawnSite, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this.spawnSite = spawnSite;
    }

    moveAlgorithm(time, delta) {
        this.flipX = this.x < this.player.x;
        if (this.spawnSite == 0){
            this._x += 3 * delta * 0.07;
        }
        else if(this.spawnSite == 1) {
            this._x -= 3 * delta * 0.07;
        }
        this.setPosition(this._x, this._y);
    }
}
