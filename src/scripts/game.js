import Phaser from 'phaser';
import Menu from './scenes/menu.js'
import Stage from './scenes/stage.js'
import Gui from './scenes/gui.js'
import ParrallaxBackground from './scenes/parrallaxBackground.js'
import End from './scenes/end.js'
import AchievementsView from './scenes/achievementsView.js';
import HistoryView from './scenes/historyView.js';

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

var config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 224,
    },input :{
        activePointers:3,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        }
    },
    scene: [
        Menu,
        Stage,
        Gui,
        ParrallaxBackground,
        End,
        AchievementsView,
        HistoryView
    ]
};

export default config;