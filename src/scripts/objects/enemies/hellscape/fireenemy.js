import Enemy from '../../enemy.js';

export default class FireEnemy extends Enemy {
    constructor(config, fellows, player, spawnSite, randomY, image) {
        super(config, fellows, player, image);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.spawnSite = spawnSite;
        this.randomY = randomY;
        this.counter = 0;
    }

    moveAlgorithm() {
        //TODO: keine Ahnung, keine eindeutige Veränderung wenn weg
        this.tick += 0.01 + Math.random() * 0.03;

        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Annahme, dass das dafür da ist, wie oft die spawnen
        if (this.cooldown < 1) {
            this.cooldown += 0.02;
        }

        var counter = this.counter;

        //TODO: Speed festlegen + Richtung
        if (this.spawnSite == 0){
            this._x += 3;
            this._y += this.randomY;
            this.counter += 1;
        }
        else if(this.spawnSite == 1) {
            this._x -= 3;
            this._y += this.randomY;
            this.counter += 1;
        }

        //TODO: Löschen nach bestimmter Pixelanzahl.
        this.removeEnemy(320);

        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._yo);
    }

    removeEnemy(pixel){
        if(this.counter >= pixel) {
            this.destroy();
        }
    }
}
