import Bullet from './bullet.js';
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
        this.life = 3;
        this.maxLife = 3;
        this._x = config.x;
        this._y = config.y;
        this._playerVelocity = new Phaser.Math.Vector2();
        this.lockRight = false;
        this.dead = false;
        this.create();
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

        this._x += this._playerVelocity.x;
        this._y += this._playerVelocity.y;

        this.x += (this._x - this.x) * 0.2;
        this.y += (this._y - this.y) * 0.2;


        if(this.y < this.margin) {
            this.y = this.margin;
        }

        if(this.y > 224-this.margin) {
            this.y = 224-this.margin;
        }

        if(this._playerVelocity.x > 0) {
            this.flipX = true;
        }
        if(this._playerVelocity.x < 0 && this.lockRight == false) {
            this.flipX = false;
        }

        if (this.inputKeys.shoot.isDown){
            this.shootTick-= delta * 0.15;
            if(this.shootTick < 0) {
                this.shoot(-2);
                this.shoot(4);
                this.shootTick = this.shootMaxTick;
            }
        }
        else {
            this.shootTick = 0;
        }
    }

    shoot(horizontalOffset = 0) {
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
            this.scene.registry.events.emit('onLifeStateChanged', this.life);
            if(this.life === 0) {
                this.scene.registry.events.emit('gameOver');
                this.destroy();
                this.dead = true;
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