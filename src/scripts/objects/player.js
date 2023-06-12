import Bullet from './bullet.js';
import Laser from './laser.js';
import Statistics from './statistic.js';

'use strict';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player');
        this.context = config.scene;
        this.xspeed = 0.25;
        this.yspeed = 0.15;
        this.margin = 8;
        this.shootMaxTick = 40;
        this.shootTick = 0;
        this.playerVelocity = new Phaser.Math.Vector2();
        this.depth = 1;
        this.life = config.life == undefined ? 3 : config.life;
        this.maxLife = 3;
        this._x = config.x;
        this._y = config.y;
        this._playerVelocity = new Phaser.Math.Vector2();
        this.lockRight = false;
        this.dead = false;
        this.distance = 0;
        this.prevPosition = 0;
        this.create();

        this.hasLaser = false;

        this.laser = new Laser({context:config.scene, player:this});
        this.context.physics.add.existing(this.laser);
        this.laser.deactivate();
    }

    create(){
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
        this.inputKeys = this.context.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
        })
    }

    update(time, delta){
        let a = this.x-this.prevPosition;
        if(a>=0) this.distance += a;
        else this.distance += -a;
        this.prevPosition = this.x;
        if(this.dead) {
            return;
        }

        this._playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            this._playerVelocity.x -= this.xspeed * delta;
        } 
        if (this.inputKeys.right.isDown){
            this._playerVelocity.x += this.xspeed * delta;
        }
        if(this.inputKeys.up.isDown){
            this._playerVelocity.y -= this.yspeed * delta;
        } 
        if (this.inputKeys.down.isDown){
            this._playerVelocity.y += this.yspeed * delta;
        }

        if(this.joyStickForce != 0) {
            let force = this.joyStickForce.clamp(0,20) / 20;
            let radian = this.joyStickAngle * (Math.PI/180);
            let velocity = new Phaser.Math.Vector2(Math.cos(radian), Math.sin(radian))

            this._playerVelocity.x += this.xspeed * delta * velocity.x * force;
            this._playerVelocity.y += this.yspeed * delta * velocity.y * force;
        }

        this._x += this._playerVelocity.x;
        this._y += this._playerVelocity.y;

        this.x += (this._x - this.x) * 0.2;
        this.y += (this._y - this.y) * 0.2;


        if(this._y < this.margin) {
            this._y = this.margin;
        }

        if(this._y > 224-this.margin) {
            this._y = 224-this.margin;
        }

        if(this._playerVelocity.x > 0) {
            this.flipX = true;
        }
        if(this._playerVelocity.x < 0 && this.lockRight == false) {
            this.flipX = false;
        }

        var pointer1 = this.context.input.pointer1;
        var pointer2 = this.context.input.pointer2;

        if (this.inputKeys.shoot.isDown || (pointer1.isDown & pointer1.x > 150) || (pointer2.isDown & pointer2.x > 150)){
            if(this.hasLaser == true) {
                this.laser.activate();
            } else {            
                this.shootTick-= delta * 0.15;
                if(this.shootTick < 0) {
                    this.shoot(-2);
                    this.shoot(4);
                    this.shootTick = this.shootMaxTick;
                }
            }
        }
        else {
            if(this.hasLaser == true) {
                this.laser.deactivate();
            } else {     
                this.shootTick = 0;
            }
        }
        
        this.laser.update();

        Statistics.localdata.distance += Math.abs(this._playerVelocity.x);
    }
    getDistance(){
        return this.distance;
    }
    shoot(horizontalOffset = 0) {
        //this.scene.registry.events.emit('shoots');
        this.context.sound.play("shoots");
        let bullet = new Bullet({scene:this.context, x:8, y:3, name:'bullet_normal'});
        bullet.x = this.x;
        bullet.y = this.y + horizontalOffset;
        bullet.velocity = this.flipX == true ? 0.75 : -0.75;
        this.context.bulletPool.push(bullet);
    }
    enemyCollision() {
        if(!this.delay){
            this.delay = true;
            this.life--;
            this.scene.sound.play('hit');
            this.scene.registry.events.emit('onLifeStateChanged', this.life);
            if(this.life === 0) {
                this.context.registry.events.emit('gameOver', this.distance);
                this.destroy();
                this.dead = true;
                this.laser.deactivate();
                return;
            }
            this.playerBlinking(20);
        }
    }
    playerBlinking(i){
        if(i>0){
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    if(i%2===0){
                        this.setBlendMode(Phaser.BlendModes.SCREEN);
                    }
                    else {
                        this.setBlendMode(Phaser.BlendModes.NORMAL);
                    }
                    this.playerBlinking(i-1);
                }
            });
        }
        else{
            this.delay = false;
        }
    }
}