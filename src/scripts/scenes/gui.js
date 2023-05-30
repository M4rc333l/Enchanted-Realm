
export default class Gui extends Phaser.Scene {
    constructor() {
        super({key: 'Gui'});
    }
    init (){
        this.scene.moveUp();
        this.points = 0;
    }
    preload(){
        this.load.image('life', '../../assets/objects/life.png')
    }
    create (){
        this.life = this.add.group({
            key: 'life',
            repeat: 2,
            setXY: {
                x: 20,
                y: 20,
                stepX: 25
            }
        })

        this.life1 = this.add.group({
            key: 'life',
            repeat: 1,
            setXY: {
                x: 20,
                y: 200,
                stepX: 25
            }
        })

        this.pointLabel = this.add.text(280, 10, this.points);

        this.itemLabel = this.add.text(120, 10, "Item: ");

        this.registry.events.on('enemyDestroyed', () => {
            this.points+=10;
            this.pointLabel.setText(this.points);
        });
        this.registry.events.on('activateSpeedItem', () => {
            this.itemLabel.setText(this.itemLabel.text+"Speed");
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.itemLabel.setText("Item: ");
                }
            });
        });
        this.registry.events.on('playerProtection', () => {
            this.itemLabel.setText(this.itemLabel.text+"Immortal");
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.itemLabel.setText("Item: ");
                }
            });
        });
        this.registry.events.on('activateLaserItem', () => {
            this.itemLabel.setText(this.itemLabel.text+"LaserGun");
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.itemLabel.setText("Item: ");
                }
            });
        });
        this.registry.events.on('loseLife', () => {
            this.life.getChildren()[this.life.getChildren().length - 1].destroy();
        });
        this.registry.events.on('gameOver', () => {
            this.registry.events.removeAllListeners();
            this.scene.pause('Stage');
            this.scene.start('End');
        });
    }
}