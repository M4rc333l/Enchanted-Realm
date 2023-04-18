import ParrallaxBackground from '../objects/parrallaxBackground';
import ParallaxBackground from '../objects/parrallaxBackground';

export default class Hellscape extends Phaser.Scene {



    constructor() {
        super({ key: 'Hellscape' })
        this.bg = new ParrallaxBackground(this, 'hellscape', 5);
    }

    preload() {
        this.bg.preload();
    }

    create() {
        this.bg.create();
    }

    update() {
        this.bg.update();
    }
}
