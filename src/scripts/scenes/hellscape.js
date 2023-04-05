export default class Hellscape extends Phaser.Scene {

  constructor() {
    super({ key: 'Hellscape' })
  }
  
  preload() {
    this.load.image('bg_01', '../../assets/stages/hellscape/hellscape_bg_01.png');
    this.load.image('bg_02', '../../assets/stages/hellscape/hellscape_bg_02.png');
    this.load.image('bg_03', '../../assets/stages/hellscape/hellscape_bg_03.png');
    this.load.image('bg_04', '../../assets/stages/hellscape/hellscape_bg_04.png');
    this.load.image('bg_05', '../../assets/stages/hellscape/hellscape_bg_05.png');
  }

  create() {
    this.bg_01 = this.add.tileSprite(0, 0, 3200, 244, 'bg_01');
    this.bg_01.setOrigin(0,0);
    this.bg_02 = this.add.tileSprite(0, 0, 3200, 244, 'bg_02');
    this.bg_02.setOrigin(0,0);
    this.bg_03 = this.add.tileSprite(0, 0, 3200, 244, 'bg_03');
    this.bg_03.setOrigin(0,0);
    this.bg_04 = this.add.tileSprite(0, 0, 3200, 244, 'bg_04');
    this.bg_04.setOrigin(0,0);
    this.bg_05 = this.add.tileSprite(0, 0, 3200, 244, 'bg_05');
    this.bg_05.setOrigin(0,0);

    
    this._position = 1200;
    this.position = 1200;
    this.depth = 1;
  }

  update() {
    var cursorKeys = this.input.keyboard.createCursorKeys();

    if(cursorKeys.right.isDown) {
        this._position += 3;
    }    
    if(cursorKeys.left.isDown) {
        this._position -= 3;
    }

    this.position += (this._position - this.position) * 0.15;

    this.bg_01.x = -0.05 * this.position * this.depth;
    this.bg_02.x = -0.15 * this.position * this.depth;
    this.bg_03.x = -0.3 * this.position * this.depth;
    this.bg_04.x = -0.4 * this.position * this.depth;
    this.bg_05.x = -0.75 * this.position * this.depth;
  }
}
