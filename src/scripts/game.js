import 'phaser';
import './background.js';
import './fullscreen.js';
import Menu from './scenes/menu.js'
import Stage from './scenes/stage.js'
import Gui from './scenes/gui.js'
import ParrallaxBackground from './scenes/parrallaxBackground.js'
import End from './scenes/end.js'

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
        End
    ]
};

function preload ()
{
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})