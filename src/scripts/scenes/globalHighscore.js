import request from "../request.js"
import statistic from "@/scripts/objects/statistic";

export default class globalHighscore extends Phaser.Scene {
    constructor() {
        super({key: 'globalHighscore'});
    }
    init() {
        this.scene.bringToTop();
    }
    preload(){
    }
    create() {
        this.add.rectangle(0,0,320,224,0x000000,0.5).setOrigin(0);
        this.username = '';
        this.highscore = null;
        this.defeatedEnemies = 0;

        this.menuText = this.add.text(50, 0, `Menü`,
            { fontFamily:'Pixelart', fontSize: '28px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setOrigin(0.5,0)
            .setInteractive()
            .on('pointerover', () => this.buttonHover(this.menuText,'blue'))
            .on('pointerout', () => this.buttonHover(this.menuText,'white'))
            .on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.scene.start('Menu')
            });
        this.infoText = this.add.text(20, 50, ``,
            { fontFamily:'Pixelart', fontSize: '26px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setOrigin(0,0);
        request("/globalHighscore","GET").then((result)=>{
            if(result.status == 200) {
                this.user = result.body;
                for (var i = 0 ;i <= this.user.length-1;i++){
                    this.infoText.text += `${this.user[i].name}: ${this.user[i].highscore}\n`;
                }
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