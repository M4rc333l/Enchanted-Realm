import 'phaser';
import './background.js';
import './fullscreen.js';
import Menu from './scenes/menu.js'
import MainScene from './scenes/hellscape.js'
import Gui from './scenes/gui.js'

var config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 224
    },
    physics: {
        default: "arcade"},
    scene: [
        Menu,
        MainScene,
        Gui
    ]
};

function preload ()
{
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})