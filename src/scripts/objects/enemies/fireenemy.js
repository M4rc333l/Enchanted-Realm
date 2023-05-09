import Enemy from '../enemy.js';

export default class FireEnemy extends Enemy {
    constructor(config, fellows, player, spawnSite) {
        super(config, fellows, player);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.spawnSite = spawnSite;
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

        //TODO: Speed festlegen + Richtung
        if (this.spawnSite == 0){
            this._x += 3;
        }
        else if(this.spawnSite == 1) {
            this._x -= 3;
        }


        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._yo);
    }
}