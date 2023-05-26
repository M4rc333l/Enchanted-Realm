import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import FireEnemy from '../objects/enemies/hellscape/fireenemy';
import SpeedItem from "../objects/items/speedItem";
import LaserGun from "../objects/items/laserGun";
import Isaac from "../objects/enemies/hellscape/isaac";
import ProtectionItem from "@/scripts/objects/items/protectionItem";

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key:"Stage"});
    }
    init (data)
    {
        if(Object.keys(data).length === 0) {
            data = {};
            data.stageConfig = {name: 'marioland', count:5, bgWidth: 320};
        }

        this.scene.launch('Gui');
        this.scene.launch('Background',{config: data.stageConfig});
        this.bg = this.scene.get('Background');
    }
    preload() {
        this.load.image('player', '../../assets/objects/player.png');
        this.load.image('bullet_normal', '../../assets/objects/lasergun_bullet.png');
        this.load.image('enemy', '../../assets/enemy/hellscape/hellscape_en_01.png');
        this.load.image('enemy2', '../../assets/enemy/hellscape/hellscape_en_02.png');
        this.load.image('item', '../../assets/objects/lasergun.png');
        this.load.image('life', '../../assets/objects/life.png');
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
            sItem = new ProtectionItem({scene:this, x:this.player.x+50, y:50}, this.player, 'life');
        }
        else if(0.25 <= randomItem < 0.5){
            //anderes Item
            sItem = new ProtectionItem({scene:this, x:this.player.x+50, y:50}, this.player, 'life');
        }
        else if(0.5 <= randomItem < 0.75){
            //anderes Item
            sItem = new ProtectionItem({scene:this, x:this.player.x+50, y:50}, this.player, 'item');
        }
        else if(0.75 <= randomItem <= 1){
            //anderes Item
            sItem = new ProtectionItem({scene:this, x:this.player.x+50, y:50}, this.player, 'item');
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
        let spawnpoint;
        let spawnSite;

        if(randomNum == 0){
            spawnpoint = this.player.x - 200;
            spawnSite = 0;
        }
        else{
            spawnpoint = this.player.x + 200;
            spawnSite = 1;
        }

        let __x = spawnpoint;
        let __y = Phaser.Math.Between(10, 210);

        let en = new FireEnemy({scene:this, x:__x, y:__y}, this.enemyPool, this.player, spawnSite, 'enemy');
        let isaac = new Isaac({scene:this, x:__x, y:__y,}, this.enemyPool, this.player, spawnSite, __y, 'enemy2');
        en.body.setSize(20,30);
        isaac.body.setSize(20,30);
        this.enemyPool.push(en);
        this.enemyPool.push(isaac);
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

        this.enemySpawnTick--;
        if(this.enemySpawnTick < 0) {
            this.enemySpawn();
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