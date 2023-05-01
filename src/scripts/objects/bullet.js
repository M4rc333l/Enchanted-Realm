
'use strict';

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'bullet_normal');
        this.context = config.scene;
        this.velocity = 5;
        this.create();
    }

    create(){
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
        this.body.setSize(10,1);
        this.depth = -1
    }

    update(){
        this.x += this.velocity;
    }

    destroy() {}
}