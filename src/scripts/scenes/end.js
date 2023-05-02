
export default class end extends Phaser.Scene {
    constructor() {
        super({key: 'End'});
    }
    init() {
        this.scene.bringToTop();
    }
    preload(){
        this.load.image('endLogo', '../../assets/objects/gameOver.png');
    }
    create() {
        const x = this.cameras.main.worldView.x + this.cameras.main.width/2;
        const y = this.cameras.main.worldView.y + this.cameras.main.height/2;

        this.gameOverLabel = this.add.text(x, y, 'GameOver',
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5})
            .setOrigin(0.5);
        this.replayLabel = this.add.text(x, y+30, "Back to Menu",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.buttonHover('blue'))
            .on('pointerout', () => this.buttonHover('white'));

        this.replayLabel.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.replayLabel,
                y: -200,
                onComplete: () => {
                    this.scene.stop('Stage');
                    this.scene.start('Menu');
                }
            });
        });
        this.ticker = 0;
    }
    buttonHover(style){
        this.replayLabel.setStyle({ fill: style});
    }
    update() {
        this.ticker+=0.001;
        this.scene.get('Background').updatePosition(Math.sin(this.ticker)*500);
    }
}