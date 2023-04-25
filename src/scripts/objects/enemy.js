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
        let move = true;

        this.fellowForce = new Phaser.Math.Vector2(0,0);
        for(let fellow of this.fellows) {
            if(fellow != this) {
                let myPos = new Phaser.Math.Vector2(this.x, this.y);
                let fellowPos = new Phaser.Math.Vector2(fellow.x, fellow.y);
                let playerPos = new Phaser.Math.Vector2(this.player.x, fellow.y);

                let distanceBetween = myPos.clone().distance(fellowPos);
                let myDistanceToPlayer = myPos.clone().distance(playerPos);
                let fellowDistanceToPlayer = fellowPos.clone().distance(playerPos);
                
                if(distanceBetween < 30 && myDistanceToPlayer > fellowDistanceToPlayer) {
                    this.fellowForce.x += this.x - fellow.x;
                    this.fellowForce.y += this.y - fellow.y;
                    this.fellowForce.normalize();
                } 
            }
        }

        this.moveAlgorithm();
    }
    moveAlgorithm() {

    }
    takeDamage(damage) {
        this.health -= damage;
        if(this.health <= 0) {
            this.destroy();
        }
    }
}