<template id="game_view">
    <img id="fullscreen-icon" v-on:click="switchFullscreen()" src="../assets/misc/fullscreen-icon.png">
    <img id="navigateback-icon" v-on:click="navigateBack()" src="../assets/misc/navigateback-icon.png">
    <canvas id="phaser-game" ref="phaser_game" style="image-rendering:pixelated;" width="320" height="224"></canvas>
</template>


<script>

import config from '../scripts/game.js';
import Phaser from 'phaser';
import request from '../scripts/request.js';

export default {
  name: 'App',
  components: {
   // HelloWorld
  },
  mounted() {
    this.initGame();
  },
  data() {
    return {
      game: null
    }
  },
  methods: {
    initGame: function() {
        config.canvas = this.$refs.phaser_game;
        this.game = new Phaser.Game(config); 
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
    },

    navigateBack() {
      this.$router.push("/login");
      request("/logout","GET");
      if(this.game!=null) {
        this.game.destroy();
      }
    }
  }
}



</script>


<style>
</style>