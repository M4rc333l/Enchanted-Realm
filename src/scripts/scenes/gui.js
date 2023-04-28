
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

        this.pointLabel = this.add.text(300, 20, this.points)

        this.registry.events.on('getPoints', () => {
            this.points+=10;
            this.pointLabel.setText(this.points);
        });
        this.registry.events.on('loseLife', () => {
            this.life.getChildren()[this.life.getChildren().length - 1].destroy();
        });
        this.registry.events.on('gameOver', () => {
            this.registry.events.removeAllListeners();
            this.scene.stop('Stage');
            this.scene.start('End');
        });
    }
}