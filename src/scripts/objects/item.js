export default class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(config, player) {
        super(config.scene, config.x, config.y, 'item');
        this.context = config.scene;
        this.player = player;
        this.create();
        this.dasd= false;
    }
    create() {
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
        this.body.setGravityY(20);
        this.body.setBounceY(0.5);
    }
    collected() {

    }
    update() {
        if(this.y >= 215) {
        }
    }
}