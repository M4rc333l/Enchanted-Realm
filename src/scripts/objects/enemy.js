export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(config, image) {
        super(config.scene, config.x, config.y, image);
        this.context = config.scene;
        this.player = this.context.player;
        this.health = 100;
        this.counter = 0;
        this.signalHit = true;
        this.red = 255;
        this.green = 255;
        this.blue = 255;
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
        this.red += (255 - this.red) * 0.06;
        this.blue += (255 - this.blue) * 0.06;
        this.green += (255 - this.green) * 0.06;
        this.setTint(Phaser.Display.Color.GetColor(this.red, this.green, this.blue));
    }
    moveAlgorithm(time, delta) {

    }
    takeDamage(damage) {
        this.health -= damage;
        if(this.health <= 0) {
            this.context.registry.events.emit('enemyDestroyed');
            this.delete();
        }
        if(this.signalHit == true) {
            this.blue = 0;
            this.green = 0; 
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