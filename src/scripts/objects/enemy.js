export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config, image) {
        super(config.scene, config.x, config.y, image);
        this.context = config.scene;
        this.player = this.context.player;
        this.health = 100;
        this.counter = 0;
        this.create();
    }
    preload(){
    }
    create() {
        this.context.add.existing(this);
        this.context.physics.add.existing(this);
    }
    update(time, delta) {
        this.counter++;
        this.removeEnemy(3200);
        this.moveAlgorithm(time, delta);
    }
    moveAlgorithm(time, delta) {

    }
    takeDamage(damage) {
        this.health -= damage;
        if(this.health <= 0) {
            this.scene.registry.events.emit('enemyDestroyed');
            this.delete();
        }
    }
    delete() {
        this.context.removeEnemy(this);
    }
    removeEnemy(pixel) {
        if (this.counter >= pixel) {
            this.destroy();
        }
    }
}