export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config, fellows, player) {
        super(config.scene, config.x, config.y, 'enemy');
        this.context = config.scene;
        this.xspeed = 1.5;
        this.yspeed = 1;
        this.health = 100;
        this.player = player;
        this.fellows = fellows ? fellows : [];
        this.fellowForce = new Phaser.Math.Vector2(0,0);
        this.lock = false;
        this.create();
    }
    preload(){
    }
    create() {
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
    }
    update() {
        this.moveAlgorithm();
    }

    moveAlgorithm() {

    }
    takeDamage(damage) {
        this.health -= damage;
        if(this.health <= 0) {
            this.scene.registry.events.emit('enemyDestroyed');
            this.destroy();
        }
    }
}