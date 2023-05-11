import Enemy from '../../enemy.js';

export default class Isaac extends Enemy {
    constructor(config, fellows, player, spawnSite, spawnpointY, image) {
        super(config, fellows, player, image);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
        this.spawnSite = spawnSite;
        this.spawnpointY = spawnpointY;
        this.counter = 0;
    }

    moveAlgorithm() {
        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Annahme, dass das dafür da ist, wie oft die spawnen
        if (this.cooldown < 1) {
            this.cooldown += 0.02;
        }

        var counter = this.counter;

        //TODO: Bewegung auf x-Achse (Speed festlegen + Richtung) & Bewegung auf y-Achse & Counter, der mitzählt, wie viele Pixel sich der Charakter schon bewegt hat
        if(this.spawnSite == 0){
            this._x += 2;
            this._yo = Math.sin(this._x * 0.04) * 10 + this.spawnpointY;
            this.counter += 1;
        }
        else if(this.spawnSite == 1){
            this._x -= 2;
            this._yo = -1 * (Math.sin(this._x * 0.04) * 10) + this.spawnpointY;
            this.counter += 1;
        }


        //TODO: Erklärung zur Bewegung auf y-Achse:
        //TODO: Es wird die x-Position abgefragt, um damit den Sinus-Wert zu berechnen. Da sich die x-Position dauerhaft ändert,
        //ändert sich auch die Richtung und Sinus wird immer wieder abgerufen.
        //Die 0.04 ist ein Faktor für die Beeinflussung der Länge zwischen den Punkten, wo der Charakter die Richtung (oben/unten) ändert.
        //Die 10 ist ein Faktor, der beeinflusst, wie weit sich der Charakter nach oben und unten bewegt.
        //Am Ende wird noch der Spawnpoint dazuaddiert, um den Charakter von oben dorthin zu verschieben.
        //spawnpointY = y-Koordinate vom Spawnpoint


        //TODO: Löschen nach bestimmter Pixelanzahl.
        this.removeEnemy(300);


        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._yo);


    }

    removeEnemy(pixel){
        if(this.counter >= pixel) {
            this.destroy();
        }
    }
}