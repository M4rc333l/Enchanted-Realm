import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import FireEnemy from '../objects/enemies/fireenemy';
import SpeedItem from "../objects/items/speedItem";

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key:"Stage"});
    }
    init (data)
    {
        if(Object.keys(data).length === 0) {
            data = {};
            data.stageConfig = {name: 'marioland', count:6, bgWidth: 320};
        }

        this.scene.launch('Gui');
        this.scene.launch('Background',{config: data.stageConfig});
        this.bg = this.scene.get('Background');
    }
    preload() {
        this.load.image('player', '../../assets/objects/player.png');
        this.load.image('bullet_normal', '../../assets/objects/bullet_normal.png');
        this.load.image('enemy', '../../assets/enemy/hellscape/hellscape_en_01.png');
        this.load.image('item', '../../assets/objects/life.png');
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

        this.itemPool = [];
        this.itemDelay = false;
        this.physics.add.overlap(this.player, this.itemPool, () => {
            this.itemPool[0].collected();
        })
        this.registry.events.on('enemyDestroyed', () => {
            if(!this.itemDelay && Math.random() < 1) {
                this.itemSpawn();
            }
        });

        //this.border = this.physics.add.sprite(0, 224, 'item').setScale(10000, 1/18);
        //this.physics.add.collider(this.itemPool, this.border);
    }
    itemSpawn(){
        //this.itemDelay = true;
        if(this.itemPool.length>0){
            this.itemPool[0].destroy();
            this.itemPool.pop();
        }
        let randomItem = Math.random();
        let sItem = null;
        if(0 <= randomItem > 0.25){
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50, name: 'item'}, this.player);
        }
        else if(0.25 < randomItem > 0.5){
            //anderes Item
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50, name: 'item'}, this.player);
        }
        else if(0.5 < randomItem > 0.75){
            //anderes Item
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50, name: 'item'}, this.player);
        }
        else if(0.75 < randomItem >= 1){
            //anderes Item
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50, name: 'item'}, this.player);
        }
        this.itemPool.push(sItem);
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.itemDelay = false;
            }
        });
    }

    enemySpawn() {
        let __x = this.player.x - 320/2 + Math.random()*1000
        let __y =  Math.random()*224;
        let en = new FireEnemy({scene:this, x:__x, y:__y, name: 'enemy'}, this.enemyPool, this.player);
        en.body.setSize(20,30);
        this.enemyPool.push(en);
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
        if(this.itemPool.length>0){
            this.itemPool[0].update();
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
    }

    onEnemyCreated(enemy) {
    }
}