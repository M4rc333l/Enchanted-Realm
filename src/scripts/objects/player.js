import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(width, height, name){
        super(width, height, name);
    }

    preload() {
        this.context.load.image('player', '../../assets/objects/player.png');
    }

    create(){
        this.context.add.existing(this);
        this.createPlayer();
    }

    update(){

        console.log("update")
        this.playerMovement(5);
    }



    createPlayer(){
        this.player = new Phaser.Physics.Matter.Sprite(this.matter.world)
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    playerMovement(speed){
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
        }else if (this.inputKeys.right.isDown){
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        }else if (this.inputKeys.down.isDown){
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y);
    }
}