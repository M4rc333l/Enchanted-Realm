import Phaser from 'phaser';
import Base from './base';
'use strict';

export default class ParrallaxBackground extends Base {
    constructor(context, name, count) {
        super(context);
        this.name = name;
        this.count = count;
        this.imageNames = [];

        for (let i = 0; i < this.count; i++) {
            let num = (i + 1).toString().padStart(2, "0");
            this.imageNames.push(`${this.name}_bg_${num}`);
        }

        this.scales = [0.05, 0.1, 0.15, 0.55, 0.75, 0.9, 1, 1, 1, 1, 1, 1];
    }

    setScales(scales) {
        this.scales = scales;
    }

    preload()
    {
        let basePath = `../../assets/stages/${this.name}/`;

        for (const name of this.imageNames) {
            this.context.load.image(name, `${basePath}${name}.png`);
        }
    }
    create() {
        this.backgrounds = [];

        for (const name of this.imageNames) {
            let part = this.context.add.tileSprite(0, 0, 3200, 244, name);
            part.setOrigin(0, 0);
            this.backgrounds.push(part);
        }

        this._position = 1200;
        this.position = 1200;
        this.depth = 1;
    }
    update() {
        var cursorKeys = this.context.input.keyboard.createCursorKeys();

        if (cursorKeys.right.isDown) {
            this._position += 6;
        }
        if (cursorKeys.left.isDown) {
            this._position -= 6;
        }

        this.position += (this._position - this.position) * 0.15;

        for (let i = 0; i < this.imageNames.length; i++) {
            this.backgrounds[i].x = -this.scales[i] * this.position * this.depth;
        }
    }
}