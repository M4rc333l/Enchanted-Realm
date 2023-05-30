import Enemy from '../../enemy.js';

export default class Enemy3 extends Enemy {
    constructor(config, fellows, player, spawnSite, randomX, image) {
        super(config, fellows, player, image);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.spawnSite = spawnSite;
        this.randomX = randomX;
        this.counter = 0;
    }

    moveAlgorithm() {

        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Annahme, dass das dafür da ist, wie oft die spawnen
        if (this.cooldown < 1) {
            this.cooldown += 0.02;
        }

        //TODO: Bewegung auf x- & y-Achse
        this._x = this.randomX;
        this._x += 0.3;
        this._yo -= 2.4;


        //TODO: Löschen nach bestimmter Pixelanzahl.
        this.removeEnemy(500);

        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._yo);
    }

    removeEnemy(pixel) {
        if (this.counter >= pixel) {
            this.destroy();
        }
    }
}