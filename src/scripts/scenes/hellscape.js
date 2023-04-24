import ParrallaxBackground from '../objects/parrallaxBackground';
import Player from '../objects/player';

export default class Hellscape extends Phaser.Scene {

    constructor() {
        super({ key: 'Hellscape' })
        this.bg = new ParrallaxBackground(this, 'hellscape', 5);
        //this.bg.setScales([0.1, 0.12, 0.4, 0.9, 1]);
        this.dynamicObjects = [];
        
    }

    preload() {
        this.bg.preload();
        this.load.image('player', '../../assets/objects/player.png');
        this.load.image('bullet_normal', '../../assets/objects/bullet_normal.png');
        //this.load.glsl("lighting", "../../scripts/shader/wave.glsl"); 
    }

    create() {

        //var shader = this.add.shader("lighting", 0, 0, 128, 128);
        //shader.setRenderToTexture("player");

        this.bg.create();
        this.player = new Player({scene:this, x:200, y:200, name:'player'});
        this.cameras.main.startFollow(this.player,false,1,0,0,88)
        //this.cameras.main.deadzone = new Phaser.Geom.Rectangle(100,100,50,50);
    }

    update() {
        this.player.update();
        this.bg.update(this.cameras.main.scrollX);
        for(const obj of this.dynamicObjects) {
            obj.update();
        }
    }
}
