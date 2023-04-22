import ParrallaxBackground from '../objects/parrallaxBackground';
import Player from '../objects/player';

export default class Hellscape extends Phaser.Scene {



    constructor() {
        super({ key: 'Hellscape' })
        this.bg = new ParrallaxBackground(this, 'pokescape', 5);
        this.bg.setScales([0.1, 0.15, 0.4, 0.5, 0]);
        this.player = new Player(200,200,'player');
    }

    preload() {
        this.bg.preload();
        this.player.preload();
    }

    create() {
        this.bg.create();
        this.player.create();
    }

    update() {
        this.bg.update();
        this.player.update();
    }
}
