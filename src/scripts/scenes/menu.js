import ParrallaxBackground from "./parrallaxBackground";
import stageConfigs from "./stageData.js";
import request from "../request.js"
import statistic from "../objects/statistic";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }
    init() {
        this.scene.launch('Background',{config: {name: 'pokescape', count:5, bgWidth:320, autoScroll: true}});
        this.scene.bringToTop();
        this.ticker = 0;
    }
    preload(){
    }
    create() {
        this.cx = this.cameras.main.worldView.x + this.cameras.main.width/2;
        this.cy = this.cameras.main.worldView.y + this.cameras.main.height/2;

        statistic.getAchievements().then(()=>{
            console.log(statistic.getSucceededAchievements());
        });


        this.username = '';
        this.highscore = null;
        this.defeatedEnemies = 0;
        
        this.info = this.add.text(this.cx,this.cy,'').setOrigin(0.5).setAlign("center").setColor('white');

        this.startLogo = this.add.text(this.cx, this.cy + 10, "Start",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.startButtonHover('blue'))
            .on('pointerout', () => this.startButtonHover('white'));

        this.achievementsLogo = this.add.text(this.cx, this.cy + 40, "Achievements",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.achievementsButtonHover('blue'))
            .on('pointerout', () => this.achievementsButtonHover('white'));

        this.history = this.add.text(this.cx, this.cy + 70, "History",
            { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setInteractive().setOrigin(0.5)
            .on('pointerover', () => this.historyButtonHover('blue'))
            .on('pointerout', () => this.historyButtonHover('white'));

            this.startLogo.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.add.tween({
                    targets: this.startLogo,
                    y: -200,
                    onComplete: () => {
                        this.scene.start('Stage', stageConfigs.levels()[0])
                        this.scene.launch('Gui', {playerLifes:this.playerLifes, points:this.points});
                        this.scene.stop('Background');
                    }
                });
            });

            this.achievementsLogo.on(Phaser.Input.Events.POINTER_DOWN, () => {
                this.add.tween({
                    targets: this.achievementsLogo,
                    y: +400,
                    onComplete: () => {
                        this.scene.start('AchievementsView')
                    }
                });
            });

        this.history.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.history,
                y: +400,
                onComplete: () => {
                    this.scene.start('HistoryView')
                }
            });
        });

            this.achievementsLogo.visible = false;

                request("/highscore","GET").then((result)=>{
                    if(result.status == 200) {
                        this.highscore = result.body.highscore == null ? 'Keinen' : result.body.highscore;
                        this.defeatedEnemies = result.body.defeatedEnemy;
                        this.username = result.body.username;
                        this.info.text = `Hallo, ${this.username}!\nHighscore: ${this.highscore}\nEliminierte Gegner: ${this.defeatedEnemies}`;
                        this.achievementsLogo.visible = true;
                        statistic.initialized = true;
                        statistic.username = this.username;
                    } else {
                        this.info.text = `Hallo, Gast!\nViel Spaß beim Spiel`;
                    }})

    }
    startButtonHover(style){
        this.startLogo.setStyle({ fill: style});
    }
    achievementsButtonHover(style){
        this.achievementsLogo.setStyle({ fill: style});
    }
    historyButtonHover(style){
        this.history.setStyle({ fill: style});
    }
    update() {
        this.ticker+=0.001;
        this.info.y = this.cy - 50 + Math.sin(this.ticker*15)*5; 
    }
}