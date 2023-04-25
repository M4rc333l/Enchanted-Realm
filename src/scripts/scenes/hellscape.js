import ParrallaxBackground from '../objects/parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";

export default class Hellscape extends Phaser.Scene {

    constructor() {
        super({ key: 'Hellscape' })
        this.bg = new ParrallaxBackground(this, 'factory', 5,352);
        //this.bg.setScales([0.1, 0.12, 0.4, 0.9, 1]);
        this.dynamicObjects = [];
        
    }
    init ()
    {
        this.scene.launch('Gui');
    }
    preload() {
        this.bg.preload();
        this.load.image('player', '../../assets/objects/player.png');
        this.load.image('bullet_normal', '../../assets/objects/bullet_normal.png');
        this.load.image('enemy', '../../assets/objects/enemy.png');
        //this.load.glsl("lighting", "../../scripts/shader/wave.glsl"); 
    }

    create() {

        //var shader = this.add.shader("lighting", 0, 0, 128, 128);
        //shader.setRenderToTexture("player");

        this.bg.create();
        this.player = new Player({scene:this, x:200, y:200, name:'player'});
        this.cameras.main.startFollow(this.player,false,1,0,0,88)
        //this.cameras.main.deadzone = new Phaser.Geom.Rectangle(100,100,50,50);


        this.enemys = new Enemy({scene:this, x:250, y: 50, name: 'enemy'});
        this.physics.add.collider(this.player, this.enemys);
        this.physics.add.overlap(this.player, this.enemys, () => {
            this.player.enemyCollision();
        });

    }

    update() {
        this.player.update();
        this.bg.update(this.cameras.main.scrollX);
        for(const obj of this.dynamicObjects) {
            obj.update();
        }
    }
}
