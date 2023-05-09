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
        this._x = config.x;
        this._y = config.y;
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
        let _playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            _playerVelocity.x -= this.xspeed * delta;
        } 
        if (this.inputKeys.right.isDown){
            _playerVelocity.x += this.xspeed * delta;
        }
        if(this.inputKeys.up.isDown){
            _playerVelocity.y -= this.yspeed * delta;
        } 
        if (this.inputKeys.down.isDown){
            _playerVelocity.y += this.yspeed * delta;
        }

        this._x += _playerVelocity.x;
        this._y += _playerVelocity.y;

        this.x += (this._x - this.x) * 0.2;
        this.y += (this._y - this.y) * 0.2;


        if(this.y < this.margin) {
            this.y = this.margin;
        }

        if(this.y > 224-this.margin) {
            this.y = 224-this.margin;
        }

        if(_playerVelocity.x > 0) {
            this.flipX = true;
        }
        if(_playerVelocity.x < 0) {
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
            this.scene.registry.events.emit('loseLife');
            if(this.life === 0) {
                this.scene.registry.events.emit('gameOver');
            }
            this.playerBlinking(10);
        }
    }
    playerBlinking(i){
        if(i>0){
            this.scene.time.addEvent({
                delay: 400,
                callback: () => {
                    if(i%2===0){
                        this.setBlendMode(Phaser.BlendModes.DARKEN);
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