import ParrallaxBackground from "./parrallaxBackground";

export default class end extends Phaser.Scene {
    constructor() {
        super({key: 'End'});
    }
    init() {
        this.scene.launch('Background',{config: {name: 'factory', count:5, bgWidth:352}});
        this.scene.bringToTop();
    }
    preload(){
        this.load.image('endLogo', '../../assets/objects/gameOver.png');
    }
    create() {
        this.logoMenu = this.add.image(this.scale.width/2,
            this.scale.height/2,
            'endLogo'
        ).setScale(2).setInteractive();

        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                y: -200,
                onComplete: () => {
                    this.scene.start('Menu')
                }
            });
        });
        this.ticker = 0;
    }
    update() {
        this.ticker+=0.001;
        this.scene.get('Background').updatePosition(Math.sin(this.ticker)*500);
    }
}