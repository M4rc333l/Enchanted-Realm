import ParrallaxBackground from "../objects/parrallaxBackground";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
        this.bg = new ParrallaxBackground(this, 'factory', 5,352);
    }
    preload(){
        this.bg.preload();
        this.load.image('startLogo', '../../assets/objects/startLogo.png');
    }
    create() {
        this.bg.create();
        this.logoMenu = this.add.image(this.scale.width/2,
            this.scale.height/2,
            'startLogo'
        ).setScale(2).setInteractive();

        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
           this.add.tween({
              targets: this.logoMenu,
               y: -200,
              onComplete: () => {
                  this.scene.start('Hellscape')
              }
           });
        });
    }
}