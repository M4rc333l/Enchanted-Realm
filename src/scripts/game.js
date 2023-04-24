import 'phaser';
import './background.js';
import './fullscreen.js';
import MainScene from './scenes/hellscape.js'

var config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 224
    },physics: {
      default: "arcade"},
    scene: [MainScene]
};

function preload ()
{
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})