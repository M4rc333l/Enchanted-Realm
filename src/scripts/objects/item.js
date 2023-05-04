export default class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(config, player) {
        super(config.scene, config.x, config.y, 'item');
        this.context = config.scene;
        this.player = player;
        this.create();
    }
    create() {
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
        this.body.setGravityY(20);
        this.body.setCollideWorldBounds(true, 0, 0.5, false)
        this.body.setBounceY(0.5);
    }
    collected() {

    }
}