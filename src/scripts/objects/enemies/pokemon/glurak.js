import Enemy from '../../enemy.js';
import BossBullet from "@/scripts/objects/bossBullet";

export default class Glurak extends Enemy {

    constructor(config, image, bulletImage) {
        super(config, image);    
        this._x = config.x;
        this._y = config.y;
        this.modes = {
            Idle: 0,
            Follow: 1,
            Wave: 2
        };

        this.mode = this.modes.Wave;
        this.randomHeight = 100;
        this.bulletImage = bulletImage;

        this.context.time.addEvent({
            delay: 1400,
            callback: () => {
                this.randomHeight = 30 + Math.random() * 150;
            },
            loop: true
        });

        this.context.time.addEvent({
            delay: 5000,
            callback: () => {
                this.mode = Phaser.Math.Between(0,2);
            },
            loop: true
        });

        var timer = this.context.time.addEvent({
            delay: 500,
            callback: ()=>{
                let bossBullet = new BossBullet({scene:this.context, x: this._x, y: this._y}, this.bulletImage, this._x, this.y);
                this.context.enemyPool.push(bossBullet);},
            loop: true
        });

        this.health = 1000;
    }

    moveAlgorithm(time, delta) {
        this.counter = 0;
        this._x = this.player.x + 180;
        switch(this.mode) {
            case this.modes.Idle:
                this._y = this.randomHeight;
                break;
                
            case this.modes.Wave:
                this._y = 100 - Math.sin(time * 0.002) * 80;
                break;
            case this.modes.Follow:
                this._y = this.player.y - 14 + this.player._playerVelocity.y * 20;
                break;
        }

        let speed = 0.1;
        this.x += ((this._x - this.x) * 0.04) * delta * 0.2;
        this.y += ((this._y - this.y) * 0.04).clamp(-delta * speed, delta * speed);
    }

}