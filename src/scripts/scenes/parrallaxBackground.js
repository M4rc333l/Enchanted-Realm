import Phaser from 'phaser';
import Base from '../objects/base/base';
'use strict';

export default class ParrallaxBackground extends Phaser.Scene {
    constructor() {
        super({ key: 'Background' });
    }

    init(data) {
        this.name = data.config.name;
        this.count = data.config.count;
        this.bgWidth = data.config.bgWidth;
        this.imageNames = [];

        for (let i = 0; i < this.count; i++) {
            let num = (i + 1).toString().padStart(2, "0");
            this.imageNames.push(`${this.name}_bg_${num}`);
        }

        this.scales = [0, 0.2, 0.4, 0.6, 1, 0.9, 1, 1, 1, 1, 1, 1];

        this.scene.moveDown();
    }

    setScales(scales) {
        this.scales = scales;
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

        this._position = 1200;
        this.position = 1200;
        this.depth = 0;

        this.lpx = 0;
    }

    updatePosition(pos) {
        this.position = pos;
    }

    update() {
        for (let i = 0; i < this.imageNames.length; i++) {
            for(let j = 0; j < 4; j++) {            
                //this.backgrounds[i].x = (Math.floor(position / this.bgWidth) * this.bgWidth + (-this.scales[i] * position * this.depth) % this.bgWidth) - this.bgWidth;
            
                let segment = Math.floor(this.position * (this.scales[i]) / this.bgWidth) - 2;
    
                this.backgrounds[i][j].x = ((segment*this.bgWidth) -(this.position * this.scales[i])) + j * this.bgWidth
                this.backgrounds[i][j].x = Math.floor(this.backgrounds[i][j].x);
            }
        }
    }
    translate(x) {

    }
}