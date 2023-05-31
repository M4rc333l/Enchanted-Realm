import Enemy from '../../enemy.js';

export default class Isaac extends Enemy {
    constructor(config, spawnSite, randomY, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this.spawnSite = spawnSite;
        this.randomY = randomY;
    }

    moveAlgorithm(time, delta) {
        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Bewegung auf x-Achse (Speed festlegen + Richtung) & Bewegung auf y-Achse & Counter, der mitzählt, wie viele Pixel sich der Charakter schon bewegt hat
        if(this.spawnSite == 0){
            this._x += 2 * delta * 0.07;
            this._y = Math.sin(this._x * 0.04) * 10 + this.randomY;
        }
        else if(this.spawnSite == 1){
            this._x -= 2 * delta * 0.07;
            this._y = -1 * (Math.sin(this._x * 0.04) * 10) + this.randomY;
        }


        //TODO: Erklärung zur Bewegung auf y-Achse:
        //TODO: Es wird die x-Position abgefragt, um damit den Sinus-Wert zu berechnen. Da sich die x-Position dauerhaft ändert,
        //ändert sich auch die Richtung und Sinus wird immer wieder abgerufen.
        //Die 0.04 ist ein Faktor für die Beeinflussung der Länge zwischen den Punkten, wo der Charakter die Richtung (oben/unten) ändert.
        //Die 10 ist ein Faktor, der beeinflusst, wie weit sich der Charakter nach oben und unten bewegt.
        //Am Ende wird noch der Spawnpoint dazuaddiert, um den Charakter von oben dorthin zu verschieben.
        //spawnpointY = y-Koordinate vom Spawnpoint

        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x, this._y);
    }
}
