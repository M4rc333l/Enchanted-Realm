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
        this.tick+= 0.01 + Math.random() * 0.03;

        this.flipX = this.x < this.player.x;

        let direction = new Phaser.Math.Vector2(this.x-this.player.x, this.y-this.player.y);


        let moveDir = direction.clone().normalize();
        console.log(moveDir);
        

        if(Math.abs(direction.x) > 50  || Math.abs(direction.y) > 50) {
            if(this.fellowForce.x == 0 && this.fellowForce.y == 0) {
                    this._x -= moveDir.x * 0.5 * this.cooldown;
                    this._y -= moveDir.y * 0.5 * this.cooldown;
            } else {
                this._x += this.fellowForce.x / 20;
                this._y += this.fellowForce.y / 20;
                this.cooldown = 0;
            }
        }

        if(this.cooldown < 1) {
            this.cooldown += 0.02;
        }
        
        this._yo = Math.sin(this.tick) * 10 + this._y;

        this.setPosition(this._x,this._yo);
    }
}