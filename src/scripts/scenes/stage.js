import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import SpeedItem from "../objects/items/speedItem";
import LaserGun from "../objects/items/laserGun";
import Glurak from "../objects/enemies/pokemon/glurak";
import Base from "../objects/base/base";
import Factory from "../objects/enemies/enemyfactory.js"

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key:"Stage"});
    }
    init (data)
    {
        if(Object.keys(data).length === 0) {
            data = {};
            data.backgroundConfig = {name: 'factory', count:5, bgWidth: 352};
            data.factoryPattern = {};
        }

        this.scene.launch('Gui');
        this.scene.launch('Background',{config: data.backgroundConfig});
        this.bg = this.scene.get('Background');
        this.bossSpawned = false;
        this.cameraOffset = 0
        this.aestheticOffset = 0;

        this.points = 0;

        this.states = {
            baseRemain: 0,
            boss: 1
        }

        this.state = 0;
        this.factory = new Factory({context:this, pattern:data.factoryPattern});

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
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

    }

    create() {
        console.log('CREATE');
        this.physics.world.checkCollision.left = false;
        this.physics.world.checkCollision.right = false;

        this.player = new Player({scene:this, x:0, y:110, name:'player'});
        this.cameras.main.startFollow(this.player,false,1,0,0,0)

        this.bulletPool = [];
        this.addPushListener(this.bulletPool, this.onBulletCreated);
        this.enemyPool = [];
        this.addPushListener(this.enemyPool, ()=>{});
        this.basePool = [];
        this.addPushListener(this.basePool, ()=>{})

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

        this.registry.events.on('gameOver', () => {
            this.registry.events.removeAllListeners();
            this.scene.stop('Gui');
            this.scene.launch('End');
        });

        this.factory.create();
        this.baseSpawn(-1000,1000);

        if(!this.game.device.os.desktop) {
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 50,
                y: 170,
                radius: 20,
                base: this.add.circle(0, 0, 20, 0x1c1c1c),
                thumb: this.add.circle(0, 0, 10, 0x3b3b3b),
                forceMin: 0,
            });
            this.joyStick.base.depth=2;
            this.joyStick.thumb.depth=2;
        } else {
            this.joyStick = {};
            this.joyStick.force = 0;
            this.joyStick.angle = 0;
        }
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

    /*
    enemySpawn(){
        //Random-Zahl generieren, um random zu bestimmen, ob Gegner rechts oder links von Hauptcharakter spawnen
        let randomNum = Phaser.Math.Between(0, 1);
        let randomY = Phaser.Math.Between(30, 200);
        let randomX = Phaser.Math.Between(30, 200);
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
        let spawnEnemy3 = 230;

        for (let i = 0; i < 5; i++) {
            let randomTimer = Phaser.Math.Between(1000, 2000);

            //TODO: FireEnemy zeitversetzt spawnen
            setTimeout(() => {
                let en = new FireEnemy({scene: this, x: __x, y: __y}, this.enemyPool, this.player, spawnSite, randomY, 'enemy');
                en.body.setSize(20, 30);
                this.enemyPool.push(en);
            }, randomTimer);

            //TODO: Isaac zeitversetzt spawnen
            setTimeout(() => {
                let isaac = new Isaac({scene: this, x: __x, y: __y}, this.enemyPool, this.player, spawnSite, randomY, 'enemy2');
                isaac.body.setSize(20, 30);
                this.enemyPool.push(isaac);
            }, randomTimer + 1000);

            //TODO: Enemy3 zeitversetzt spawnen
            setTimeout(() => {
                randomX = this.player.x;

                let enemy3 = new Enemy3({scene: this, x: __x, y: spawnEnemy3}, this.enemyPool, this.player, spawnSite, randomX, 'enemy2');
                enemy3.body.setSize(20, 30);
                this.enemyPool.push(enemy3);
            }, i*100);
        }


    }
**/
    bossSpawn(){
        let __x = this.cameras.main.scrollX + 400;
        let __y = 100;
        let boss = new Glurak({ scene: this, x: __x, y: __y }, 'boss');
        console.log(boss);
        boss.body.setSize(114, 80);
        this.enemyPool.push(boss);
    }

    baseSpawn(min, max){
        for(let i = 0; i < 10; i++) {
            let offset = i * (max-min)/10;
            let randomX = Phaser.Math.Between(min+offset+5, min+offset + (max-min)/10-5);
            let randomY = Phaser.Math.Between(10,190);

            let base1 = new Base({scene: this, x: randomX, y: randomY}, 'base1');
            this.basePool.push(base1);
        }
    }

    update(time, delta) {
        this.bg.updatePosition(this.aestheticOffset + this.cameras.main.scrollX);
        this.player.joyStickForce = this.joyStick.force;
        this.player.joyStickAngle = this.joyStick.angle;
        this.player.update(time, delta);

        this.cameraOffset = this.state == this.states.baseRemain ? 0 : -90;
        this.cameras.main.followOffset.x += (this.cameraOffset - this.cameras.main.followOffset.x) * 0.02;

        if(this.state == this.states.boss) {
            this.aestheticOffset += delta * 0.07;
        }

        for(const obj of this.bulletPool) {
            obj.update(time, delta);
        }
        for(const obj of this.enemyPool) {
            obj.update(time, delta);
        }

        //TODO: wie viele enemys spawnen
        /*this.enemySpawnTick--;
        if(this.enemySpawnTick < 0) {
            //this.enemySpawn();
            //this.enemySpawnTick = 500;
        }

        //TODO: das nur ein boss gespawnt wird
        if (!this.bossSpawned) {
            this.baseSpawn();
            this.bossSpawn();
            this.bossSpawned = true;
        }*/
    }

    addPushListener(arr, callback) {
        arr.push = (e) => {
            Array.prototype.push.call(arr, e);
            callback(this, e);
        };
    }

    onBulletCreated(context, bullet) {
        context.physics.add.overlap(bullet, context.enemyPool.concat(context.basePool), (bullet, enemy) => {
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

    removeEnemy(enemy) {
        enemy.destroy();
        this.addPoints(10);
    }

    removeBase(base) {
        base.destroy();
        
        let activeCount = 0;
        for(let base of this.basePool) {
            if(base.active == true) {
                activeCount ++;
            }
        }

        if(activeCount <= 2) {
            for(let base of this.basePool) {
                base.destroy();
            }
            this.factory.deactivate();
            this.bossSpawn();
            this.state = 1;
            this.player.lockRight = true;
        }

        this.addPoints(50);
        this.registry.events.emit('onBaseStateChanged', this.basePool);
    }

    addPoints(points) {
        this.points += points;
        this.registry.events.emit('onPointsChanged', this.points);
    }

}
