export default class Laser extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.context, 100, 100, 'laser');
        this.alpha = 0;
        
        this.context = config.context;
        this.player = config.player;

        this.castLength = 150;
        this.actualLength = 0;

        this.scaleX = 200
        this.ticker = 0;

        this.laserImage = new Phaser.GameObjects.Sprite(config.context, 100, 100, 'laser');
        this.laserImage.scaleX = 200;
        
        this.context.add.existing(this.laserImage);

        this.collidingBodies = [];

        this.context.addPushListener(this.context.enemyPool, (context, enemy)=>{
            context.physics.add.overlap(this, enemy, (laser, enemy) => {
                this.collidingBodies.push(enemy);
            });
        })

        this.context.addPushListener(this.context.basePool, (context, base)=>{
            context.physics.add.overlap(this, base, (laser, base) => {
                this.collidingBodies.push(base);
            });
        })
    }

    activate() {
        this.body.enable = true;
    }
    deactivate() {
        this.body.enable = false;
        this.laserImage.alpha = 0;
    }

    getNearest() {
        let distanceToPlayer = 0;
        let shortestEnemy = null; 
        for(let enemy of this.collidingBodies) {
            if(Math.abs(this.player.x - enemy.x) < distanceToPlayer || distanceToPlayer == 0) {
                distanceToPlayer = Math.abs(this.player.x - enemy.x);
                shortestEnemy = enemy;
            }
        }
        return [distanceToPlayer, shortestEnemy];
    }

    update() {

        this.ticker++;

        this.laserImage.alpha = this.body.enable == true ? 1 + Math.sin(this.ticker*0.5) / 2 : 0;

        this.body.setSize(1, 5);

        this.setPosition(this.player.x, this.player.y);
        this.setOrigin(this.player.flipX == false ? 1 : 0, 0.5)

        this.laserImage.setPosition(this.player.x, this.player.y);
        this.laserImage.setOrigin(this.player.flipX == false ? 1 : 0, 0.5)
        this.laserImage.scaleX = 200;

        let nearest = this.getNearest();
        if(nearest[0] != 0) {
            this.laserImage.scaleX = nearest[0];
            nearest[1].takeDamage(15);
        }

        this.collidingBodies = [];
    }

    getLength() {

    }

}