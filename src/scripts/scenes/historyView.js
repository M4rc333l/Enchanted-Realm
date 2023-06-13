import AchievementFrame from "../objects/achievementFrame";
import Statistics from "../objects/statistic.js";
import request from "../request.js"
import statistic from "@/scripts/objects/statistic";

export default class HistoryView extends Phaser.Scene {
    constructor() {
        super({key: 'HistoryView'});
    }
    init() {
        this.scene.bringToTop();
    }
    preload(){
    }
    create() {
       // this.add.rectangle(0,0,320,224,0x000000,0.5).setOrigin(0);
        this.username = '';
        this.highscore = null;
        this.defeatedEnemies = 0;

        this.menuText = this.add.text(50, 0, `Menü`,
            { fontFamily:'Pixelart', fontSize: '28px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setOrigin(0.5,0)
            .setInteractive()
            .on('pointerover', (e) => this.buttonHover(this.menuText,'blue'))
            .on('pointerout', (e) => this.buttonHover(this.menuText,'white'))
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.scene.start('Menu')
            });
        this.infoText = this.add.text(100, 50, ``,
            { fontFamily:'Pixelart', fontSize: '28px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setOrigin(0.5,0);
        request("/history","GET").then((result)=>{
            if(result.status == 200) {
                this.score1 = result.body.score1;
                this.score2 = result.body.score2;
                this.score3 = result.body.score3;
                this.score4 = result.body.score4;
                this.score5 = result.body.score5;
                this.infoText.text = `Game 1: ${this.score1}\nGame 2: ${this.score2}\nGame 3: ${this.score3}\nGame 4: ${this.score4}\nGame 5: ${this.score5}`;
                statistic.initialized = true;
            }})
    }

    buttonHover(button,style){
        button.setStyle({ fill: style});
    }
    update() {
        this.ticker+=0.001;
    }
}