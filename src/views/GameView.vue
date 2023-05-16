<template id="game_view">
    <img id="fullscreen-icon" v-on:click="switchFullscreen()" src="../assets/misc/fullscreen-icon.png">
    <canvas id="phaser-game" ref="phaser_game"></canvas>
</template>


<script>

import config from '../scripts/game.js';
import Phaser from 'phaser';

export default {
  name: 'App',
  components: {
   // HelloWorld
  },
  mounted() {
    this.initGame();
  },
  methods: {
    initGame: function() {
        console.log(this.$refs.phaser_game);
        config.canvas = this.$refs.phaser_game;
        new Phaser.Game(config); 
    },
    openFullscreen: function() {
    var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { 
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { 
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { 
        elem.msRequestFullscreen();
      }    
      
    },
  
    closeFullscreen:function() {
      
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
      }
    
    },

    switchFullscreen() {
      if( window.innerHeight == screen.height) {
        this.closeFullscreen();
      } else {
        this.openFullscreen();
      }
    }
  }
}
</script>


<style>
</style>