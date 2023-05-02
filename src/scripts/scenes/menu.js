import ParrallaxBackground from "./parrallaxBackground";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }
    init() {
        this.scene.launch('Background',{config: {name: 'factory', count:5, bgWidth:352}});
        this.scene.bringToTop();
    }
    preload(){
        this.load.image('startLogo', '../../assets/objects/startLogo.png');
    }
    create() {
        const x = this.cameras.main.worldView.x + this.cameras.main.width/2;
        const y = this.cameras.main.worldView.y + this.cameras.main.height/2;

        this.startLogo = this.add.text(x, y, "Start",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.buttonHover('blue'))
            .on('pointerout', () => this.buttonHover('white'));

        this.startLogo.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.startLogo,
                y: -200,
                onComplete: () => {
                    this.scene.start('Stage')
                }
            });
        });
        this.ticker = 0;
    }
    buttonHover(style){
        this.startLogo.setStyle({ fill: style});
    }
    update() {
        this.ticker+=0.001;
        this.scene.get('Background').updatePosition(Math.sin(this.ticker)*500);
    }
}