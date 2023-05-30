import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import FireEnemy from '../objects/enemies/hellscape/fireenemy';
import SpeedItem from "../objects/items/speedItem";
import LaserGun from "../objects/items/laserGun";
import Isaac from "../objects/enemies/hellscape/isaac";
import Glurak from "../objects/enemies/pokemon/glurak";
import Base from "../objects/base/base";

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
        //TODO: Player
        this.load.image('player', '../../assets/objects/player.png');

        //TODO: Waffen & Bullets
        this.load.image('item', '../../assets/objects/lasergun.png');
        this.load.image('bullet_normal', '../../assets/objects/lasergun_bullet.png');

        //TODO: Gegner
        this.load.image('enemy', '../../assets/enemy/hellscape/hellscape_en_01.png');
        this.load.image('enemy2', '../../assets/enemy/hellscape/hellscape_en_02.png');

        //TODO: Bosse
        this.load.image('boss', '../../assets/enemy/pokemon/glumanda.png');

        //TODO: Objekte
        this.load.image('life', '../../assets/objects/life.png');

        //TODO basen
        this.load.image('base1', '../../assets/basen/pokemon/testbase.png');
    }

    create() {

        this.physics.world.checkCollision.left = false;
        this.physics.world.checkCollision.right = false;

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

        this.itemPool = [];
        this.itemDelay = false;
        this.physics.add.overlap(this.player, this.itemPool, () => {
            this.itemPool[0].collected();
        })


        this.registry.events.on('enemyDestroyed', () => {
            //WK für das Spawnen eines Items
            if(!this.itemDelay && Math.random() < 1) {
                this.itemSpawn();
            }
        });
    }
    itemSpawn(){
        this.itemDelay = true;
        if(this.itemPool.length>0){
            this.itemPool[0].destroy();
            this.itemPool.pop();
        }
        let randomItem = Math.random();
        let sItem = null;
        if(0 <= randomItem < 0.25){
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50}, this.player, 'life');
        }
        else if(0.25 <= randomItem < 0.5){
            //anderes Item
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50}, this.player, 'life');
        }
        else if(0.5 <= randomItem < 0.75){
            //anderes Item
            sItem = new LaserGun({scene:this, x:this.player.x+50, y:50}, this.player, 'item');
        }
        else if(0.75 <= randomItem <= 1){
            //anderes Item
            sItem = new LaserGun({scene:this, x:this.player.x+50, y:50}, this.player, 'item');
        }
        this.itemPool.push(sItem);
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.itemDelay = false;
            }
        });
    }

    enemySpawn(){
        //Random-Zahl generieren, um random zu bestimmen, ob Gegner rechts oder links von Hauptcharakter spawnen
        let randomNum = Phaser.Math.Between(0, 1);
        let randomY = Phaser.Math.Between(30, 200);
        let spawnpoint;
        let spawnSite;

        if(randomNum == 0){
            spawnpoint = this.player.x - 250;
            spawnSite = 0;
        }
        else{
            spawnpoint = this.player.x + 250;
            spawnSite = 1;
        }

        //TODo: x- & y-Position des Enemies
        let __x = spawnpoint;
        let __y = Phaser.Math.Between(10, 210);

        for (let i = 0; i < 5; i++) {
            let randomTimer = Phaser.Math.Between(1000, 2000);

            //TODO: FireEnemy zeitversetzt spawnen
            setTimeout(() => {
                let en = new FireEnemy({scene: this, x: __x, y: __y}, this.enemyPool, this.player, spawnSite, randomY, 'enemy');
                en.body.setSize(20, 30);
                this.enemyPool.push(en);
            }, randomTimer);

            //TODO: Isaac zeitversetzt spawnen
            let randomTimer2 = Phaser.Math.Between(1000, 2000);
            setTimeout(() => {
                let isaac = new Isaac({scene: this, x: __x, y: __y}, this.enemyPool, this.player, spawnSite, randomY, 'enemy2');
                isaac.body.setSize(20, 30);
                this.enemyPool.push(isaac);
            }, randomTimer + 1000);
        }
    }

    bossSpawn(){
        let __x = 300;
        let __y = 100;
        let boss = new Glurak({ scene: this, x: __x, y: __y }, this.enemyPool, this.player, 'boss');
        boss.body.setSize(114, 80);
        this.enemyPool.push(boss);
    }

    baseSpawn(){
        let __x = 30;
        let __y = 10;

            let randomY = Phaser.Math.Between(30, 190);

            let base1 = new Base({scene: this, x: __x, y: __y}, this.enemyPool, this.player, 100, randomY, 'base1');
            base1.body.setSize(14, 12);
            this.enemyPool.push(base1);
            let base2 = new Base({scene: this, x: __x, y: __y}, this.enemyPool, this.player, 300, randomY, 'base1');
            base2.body.setSize(14, 12);
            this.enemyPool.push(base2);
    }

    update(time, delta) {
        this.bg.updatePosition(this.cameras.main.scrollX);
        this.player.update(time, delta);

        for(const obj of this.bulletPool) {
            obj.update(time, delta);
        }
        for(const obj of this.enemyPool) {
            obj.update(time, delta);
        }

        //TODO: wie viele enemys spawnen
        this.enemySpawnTick--;
        if(this.enemySpawnTick < 0) {
            this.enemySpawn();
            this.enemySpawnTick = 500;
            //this.enemySpawnTick = 500;
        }

        //TODO: das nur ein boss gespawnt wird
        if (!this.bossSpawned) {
            this.baseSpawn();
            this.bossSpawn();
            this.bossSpawned = true;
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
        context.time.addEvent({
            delay: 5000,
            callback: () => {
                Phaser.GameObjects.Sprite.prototype.destroy.call(bullet);
            }
        });
    }

    onEnemyCreated(enemy) {
    }
}
