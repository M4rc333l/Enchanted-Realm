import ParrallaxBackground from "./parrallaxBackground";
import stageConfigs from "./stageData.js";
import request from "../request.js"

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }
    init() {
        this.scene.launch('Background',{config: {name: 'factory', count:5, bgWidth:352}});
        this.scene.bringToTop();
    }
    preload(){
    }
    create() {
        this.cx = this.cameras.main.worldView.x + this.cameras.main.width/2;
        this.cy = this.cameras.main.worldView.y + this.cameras.main.height/2;

        this.username = '';
        this.highscore = null;
        this.defeatedEnemies = 0;
        
        this.info = this.add.text(this.cx,this.cy,'').setOrigin(0.5).setAlign("center").setColor('white');

        this.startLogo = this.add.text(this.cx, this.cy + 10, "Start",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.buttonHover('blue'))
            .on('pointerout', () => this.buttonHover('white'));

        this.startLogo.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.startLogo,
                y: -200,
                onComplete: () => {
                    this.scene.start('Stage', stageConfigs.hellscapeConfig)
                    this.scene.stop('Background');
                }
            });
        });
        this.ticker = 0;

        request("/highscore","GET").then((result)=>{
            if(result.status == 200) {
                this.highscore = result.body.highscore == null ? 'Keinen' : result.body.highscore;
                this.defeatedEnemies = result.body.defeatedEnemy;
                this.username = result.body.username;
                this.info.text = `Hallo, ${this.username}!\nHighscore: ${this.highscore}\nEliminierte Gegner: ${this.defeatedEnemies}`;
            } else {
                this.info.text = `Hallo, Gast!\nViel Spaß beim Spiel`;
            }
        })

    }
    buttonHover(style){
        this.startLogo.setStyle({ fill: style});
    }
    update() {
        this.ticker+=0.001;
        try {
            this.scene.get('Background').updatePosition(Math.sin(this.ticker)*500);
        } catch {}
        this.info.y = this.cy - 50 + Math.sin(this.ticker*15)*5; 
    }
}