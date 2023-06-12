import AchievementFrame from "../objects/achievementFrame";
import Statistics from "../objects/statistic.js";

export default class AchievementsView extends Phaser.Scene {
    constructor() {
        super({key: 'AchievementsView'});
        this.page = 0;
        this.maxItems = 4;
        this.maxPage = Math.floor((Statistics.achievements.length - 1) / this.maxItems);
        this.pagedItems = [];
        this.frames = [];
    }
    init() {
        this.scene.bringToTop();
    }
    preload(){
        this.load.image('achievementframe', '../../assets/objects/achievementframe.png');
    }
    create() {

        this.leftPageButton = this.add.text(4, 0, "<",
        { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
        .setInteractive().setOrigin(0,0)
        .on('pointerover', (e) => this.buttonHover(this.leftPageButton,'blue'))
        .on('pointerout', (e) => this.buttonHover(this.leftPageButton,'white'))
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.page++;
            if(this.page > this.maxPage) {
                this.page = 0;
            }
            this.selectPage(this.page);
        });

        this.rightPageButton = this.add.text(290, 0, ">",
        { fontFamily:'Pixelart', fontSize: '30px', color: 'white', stroke: 'black', strokeThickness: 5 })
        .setInteractive().setOrigin(0,0)
        .on('pointerover', (e) => this.buttonHover(this.rightPageButton,'blue'))
        .on('pointerout', (e) => this.buttonHover(this.rightPageButton,'white'))
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.page--;
            if(this.page < 0) {
                this.page = this.maxPage;
            }
            this.selectPage(this.page);
        });;

        this.pageText = this.add.text(160, 0, `Seite 1/${this.maxPage+1}`,
        { fontFamily:'Pixelart', fontSize: '28px', color: 'white', stroke: 'black', strokeThickness: 5 }).setOrigin(0.5,0)


        this.selectPage(0);

    }

    selectPage(page) {
        this.page = page;
        this.pageText.text = `Seite ${this.page+1}/${this.maxPage+1}`;
        this.pagedItems = Statistics.achievements.slice(page*this.maxItems,page*this.maxItems + this.maxItems)
        this.buildFrames();
    }

    buildFrames() {
        for(let frame of this.frames) {
            frame.delete();
        }
        this.frames = [];

        for(let i = 0; i < this.pagedItems.length; i++) {
            let frame = new AchievementFrame(this,30,50+i*38,this.pagedItems[i].type,this.pagedItems[i].amount,this.pagedItems[i].name,this.pagedItems[i].description,this.pagedItems[i].done);
            this.frames.push(frame);
        }
    }

    buttonHover(button,style){
        button.setStyle({ fill: style});
    }

    update() {
    }
}