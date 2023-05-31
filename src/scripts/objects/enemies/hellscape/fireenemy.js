import Enemy from '../../enemy.js';

export default class FireEnemy extends Enemy {
    constructor(config, spawnSite, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this.spawnSite = spawnSite;
    }

    moveAlgorithm(time, delta) {
        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Speed festlegen + Richtung
        if (this.spawnSite == 0){
            this._x += 3 * delta * 0.07;
        }
        else if(this.spawnSite == 1) {
            this._x -= 3 * delta * 0.07;
        }

        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._y);
    }
}
