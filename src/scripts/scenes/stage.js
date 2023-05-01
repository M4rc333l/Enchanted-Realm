import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import FireEnemy from '../objects/enemies/fireenemy';

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key:"Stage"});
    }
    init (data)
    {
        if(Object.keys(data).length === 0) {
            data = {};
            data.stageConfig = {name: 'hellscape', count:5, bgWidth: 320};
        }

        this.scene.launch('Gui');
        this.scene.launch('Background',{config: data.stageConfig});
        this.bg = this.scene.get('Background');
    }
    preload() {
        this.load.image('player', '../../assets/objects/player.png');
        this.load.image('bullet_normal', '../../assets/objects/bullet_normal.png');
        this.load.image('enemy', '../../assets/objects/enemy.png');
    }

    create() {
        this.player = new Player({scene:this, x:200, y:200, name:'player'});
        this.cameras.main.startFollow(this.player,false,1,0,0,88)

        this.bulletPool = [];
        this.addPushListener(this.bulletPool, this.onBulletCreated);
        this.enemyPool = [];
        this.addPushListener(this.enemyPool, this.onEnemyCreated);

        this.enemySpawnTick = 0;

        this.physics.add.overlap(this.player, this.enemyPool, () => {
            this.player.enemyCollision();
        })
    }

    spawn() {
        let __x = this.player.x - 320/2 + Math.random()*1000
        let __y =  Math.random()*224;
        let en = new FireEnemy({scene:this, x:__x, y:__y, name: 'enemy'}, this.enemyPool, this.player);
        en.body.setSize(20,30);
        this.enemyPool.push(en);
    }

    update() {
        this.bg.updatePosition(this.cameras.main.scrollX);
        this.player.update();
        for(const obj of this.bulletPool) {
            obj.update();
        }        
        for(const obj of this.enemyPool) {
            obj.update();
        }

        this.enemySpawnTick--;
        if(this.enemySpawnTick < 0) {
            this.spawn();
            this.enemySpawnTick = 500;
        }
    }

    addPushListener(arr, callback) {
        arr.push = (e) => {
            Array.prototype.push.call(arr, e);
            callback(this, e);
        };
    }

    onBulletCreated(context, bullet) {
        context.physics.add.overlap(bullet, context.enemyPool, (bullet, enemy) => {
            console.log(bullet);
           Phaser.GameObjects.Sprite.prototype.destroy.call(bullet);
           enemy.takeDamage(30);
        });
    }

    onEnemyCreated(enemy) {
    }
}