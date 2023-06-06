import Enemy from '../../enemy.js';

export default class Enemy3 extends Enemy {
    constructor(config, spawnSite, randomX, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this._y = 200;
        this.randomX = randomX;
    }

    moveAlgorithm(time, delta) {

        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;
        //TODO: Bewegung auf x- & y-Achse
        this._x = this.randomX;
        this._x += 0.3;
        this._y -= 0.8;
        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._y);
    }
}