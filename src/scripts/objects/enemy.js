export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'enemy');
        this.context = config.scene;
        this.xspeed = 1.5;
        this.yspeed = 1;
        this.create();
    }
    preload(){
    }
    create() {
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
    }
}