import Bullet from './bullet.js';
'use strict';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player');
        this.context = config.scene;
        this.xspeed = 1.5;
        this.yspeed = 1;
        this.margin = 8;
        this.shootMaxTick = 40;
        this.shootTick = 0;
        this.playerVelocity = new Phaser.Math.Vector2();
        this.depth = 1;
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

    update(){
        let _playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            _playerVelocity.x -= this.xspeed;
        } 
        if (this.inputKeys.right.isDown){
            _playerVelocity.x += this.xspeed;
        }
        if(this.inputKeys.up.isDown){
            _playerVelocity.y -= this.yspeed;
        } 
        if (this.inputKeys.down.isDown){
            _playerVelocity.y += this.yspeed;
        }

        this.playerVelocity.x += (_playerVelocity.x - this.playerVelocity.x) * 0.2;
        this.playerVelocity.y += (_playerVelocity.y - this.playerVelocity.y) * 0.2;

        this.x += this.playerVelocity.x;
        this.y += this.playerVelocity.y;

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
            this.shootTick--;
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
        bullet.velocity = this.flipX == true ? 5 : -5;
        this.context.dynamicObjects.push(bullet);
    }
}