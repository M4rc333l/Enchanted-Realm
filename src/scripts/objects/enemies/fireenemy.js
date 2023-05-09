import Enemy from '../enemy.js';

export default class FireEnemy extends Enemy {
    constructor(config, fellows, player) {
        super(config, fellows, player);
        this.tick = 0;
        this._x = config.x;
        this._y = config.y;
        this._yo = config.y;
        this.direction = 0;
        this.player = player;
        this.cooldown = 1;
    }
    moveAlgorithm() {
        //TODO: keine Ahnung, keine eindeutige Veränderung wenn weg
    moveAlgorithm(time, delta) {
        this.tick+= 0.01 + Math.random() * 0.03;

        //TODO: Gegner spiegeln
        this.flipX = this.x < this.player.x;

        //TODO: Error wenn weg
        let direction = new Phaser.Math.Vector2(this.x-this.player.x, this.y-this.player.y);

        //TODO: Error wenn weg
        let moveDir = direction.clone().normalize();
        
        //TODO: Wenn weg, dann keine Bewegung, nur oben und unten -> für links und rechts
        if(Math.abs(direction.x) > 50  || Math.abs(direction.y) > 50) {
            if(this.fellowForce.x == 0 && this.fellowForce.y == 0) {
                    this._x -= moveDir.x * delta * 0.075 * this.cooldown;
                    this._y -= moveDir.y * delta * 0.075 * this.cooldown;
            } else {
                this._x += this.fellowForce.x / 20;
                this._y += this.fellowForce.y / 20;
                this.cooldown = 0;
            }
        }

        //TODO: Annahme, dass das dafür da ist, wie oft die spawnen
        if(this.cooldown < 1) {
            this.cooldown += 0.02;
        }

        //TODO: Wenn weg, dann nur horizontale Bewegung -> für hoch & runter
        this._yo = Math.sin(this.tick) * 10 + this._y;

        //TODO: Wenn weg, dann gar keine Bewegung mehr -> für Aktualisierug der Position
        this.setPosition(this._x,this._yo);
    }
}