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
        //TODO: Bewegung auf x-Achse
        this._x -= 5;
        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._y);
    }
}