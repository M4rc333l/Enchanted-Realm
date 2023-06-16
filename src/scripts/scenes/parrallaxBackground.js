import Phaser from 'phaser';
'use strict';

export default class ParrallaxBackground extends Phaser.Scene {
    constructor() {
        super({ key: 'Background' });
        this.ticker = 0;
    }

    init(data) {
        this.name = data.config.name;
        this.count = data.config.count;
        this.bgWidth = data.config.bgWidth;
        this.autoScroll = data.config.autoScroll;
        this.imageNames = [];

        for (let i = 0; i < this.count; i++) {
            let num = (i + 1).toString().padStart(2, "0");
            this.imageNames.push(`${this.name}_bg_${num}`);
        }

        this.scales = [0, 0.2, 0.4, 0.6, 1, 0.9, 1, 1, 1, 1, 1, 1];
        this.scene.moveDown();
    }

    preload()
    {
        let basePath = `../../assets/stages/${this.name}/`;
        for (const name of this.imageNames) {
            this.load.image(name, `${basePath}${name}.png`);
        }
    }
    create() {
        this.backgrounds = [];
        for (const name of this.imageNames) {
            this.backgrounds.push([]);
            for(let i = 0; i < 4; i++) {
                let part = this.add.image(0, 0, name);
                part.setOrigin(0, 0);
                part.depth = 10;
                this.backgrounds[this.backgrounds.length-1].push(part);
            }
        }
        this.position = 1200;
    }

    updatePosition(pos) {
        this.position = pos;
    }

    update() {
        if(this.autoScroll) {
            this.ticker+=0.001;
            this.updatePosition(Math.sin(this.ticker)*500);
        }

        for (let i = 0; i < this.imageNames.length; i++) {
            for(let j = 0; j < 4; j++) {
                let segment = Math.floor(this.position * (this.scales[i]) / this.bgWidth) - 2;
                this.backgrounds[i][j].x = ((segment*this.bgWidth) -(this.position * this.scales[i])) + j * this.bgWidth
                this.backgrounds[i][j].x = Math.floor(this.backgrounds[i][j].x);
            }
        }
    }
}