import 'phaser';
import ParrallaxBackground from './parrallaxBackground';
import Player from '../objects/player';
import Enemy from "../objects/enemy";
import SpeedItem from "../objects/items/speedItem";
import LaserGun from "../objects/items/laserGun";
import Base from "../objects/base/base";
import Factory from "../objects/enemies/enemyfactory.js"
import ProtectionItem from "@/scripts/objects/items/protectionItem";
import stageConfigs from '../scenes/stageData.js';
import BossBullet from "@/scripts/objects/bossBullet";
import Statistic from '../objects/statistic';

export default class Stage extends Phaser.Scene {
    constructor() {
        super({key:"Stage"});
    }
    init (data)
    {
        
        this.cameras.main.fadeIn(1000,255,255,255);
        if(Object.keys(data).length === 0) {
            data = {};
            data.backgroundConfig = {name: 'factory', count:5, bgWidth: 352};
            data.factoryPattern = {};
            data.bossSpawn = (context) => {};
            data.baseImage = "base_pokescape";
        }
        this.playerLifes = data.playerLifes == undefined ? 3 : data.playerLifes;
        this.points = data.points == undefined ? 0 : data.points;
        this.stageIndex = data.points == undefined ? 0 : data.stageIndex;

        this.bossSpawn = data.bossSpawn;
        this.baseImage = data.baseImage;

        this.scene.launch('Background',{config: data.backgroundConfig});

        this.bg = this.scene.get('Background');
        this.bg.scene.moveDown();
        
        this.bossSpawned = false;
        this.boss = null;
        
        this.cameraOffset = 0
        this.aestheticOffset = 0;

        this.defeatedEnemy = 0;

        this.states = {
            baseRemain: 0,
            boss: 1,
            done: 2
        }

        this.endedAnim = undefined;
        this.state = 0;
        this.factory = new Factory({context:this, pattern:data.factoryPattern});
    }
    preload() {
        //Player
        this.load.image('player', '../../assets/objects/player.png');

        //Waffen & Bullets
        this.load.image('item', '../../assets/objects/lasergun.png');
        this.load.image('bullet_normal', '../../assets/objects/lasergun_bullet.png');

        //Gegner Pokescape
        this.load.image('enPoke1', '../../assets/enemy/pokemon/pokescape_en_01.png');
        this.load.image('enPoke2', '../../assets/enemy/pokemon/pokescape_en_02.png');
        this.load.image('enPoke3', '../../assets/enemy/pokemon/pokescape_en_03.png');

        //Gegner Marioland
        this.load.image('enMario1', '../../assets/enemy/marioland/marioland_en_01.png');
        this.load.image('enMario2', '../../assets/enemy/marioland/marioland_en_02.png');
        this.load.image('enMario3', '../../assets/enemy/marioland/marioland_en_03.png');

        //Gegner Hellscape
        this.load.image('enemy', '../../assets/enemy/hellscape/hellscape_en_01.png');
        this.load.image('enemy2', '../../assets/enemy/hellscape/hellscape_en_02.png');
        this.load.image('enemy3', '../../assets/enemy/hellscape/hellscape_en_03.png');

        //Bosse & Bullets
        this.load.image('boss1', '../../assets/enemy/pokemon/glumanda.png');
        this.load.image('boss2', '../../assets/enemy/marioland/boss_mario.png');
        this.load.image('boss3', '../../assets/enemy/hellscape/boss_isaac.png');
        this.load.image('bossBullet1', '../../assets/enemy/pokemon/bullet_pokemon_boss.png');
        this.load.image('bossBullet2', '../../assets/enemy/marioland/bullet_mario_boss.png');
        this.load.image('bossBullet3', '../../assets/enemy/hellscape/bullet_isaac_boss.png');

        //Objekte
        this.load.image('speed', '../../assets/objects/speed.png');
        this.load.image('unverwundbar', '../../assets/objects/unverwundbarkeit.png');

        //Basen
        this.load.image('base1', '../../assets/basen/base_pokescape.png');
        this.load.image('base2', '../../assets/basen/base_mario.png');
        this.load.image('base3', '../../assets/basen/base_isaac.png');
        this.load.image('laser', '../../assets/objects/laser.png');
        this.load.image('lasershot', '../../assets/objects/lasershot.png');

        //Plugin
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);

        //Audio-Files
        this.load.audio('backgroundMusic', '../../assets/audio/Level1.mp3');
        this.load.audio('GameOver', '../../assets/audio/GameOver.mp3');
        this.load.audio('shoots', '../../assets/audio/shoots.mp3');
        this.load.audio('pickupItem', '../../assets/audio/pickupItem.wav');
        this.load.audio('hit', '../../assets/audio/explosion.wav');
        this.load.audio('Salatsosse', '../../assets/audio/Salatsosse.mp3');
        this.load.audio('laserSound', '../../assets/audio/synth.wav');
        this.load.audio('enemyExplosion', '../../assets/audio/enemyExplosion.wav');
    }

    create() {
        this.backgroundMusic = this.sound.add('backgroundMusic');
        var hit = this.sound.add('hit');
        this.laserSound = this.sound.add('laserSound', {loop:true, volume:0.7})
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;

    
        this.registry.events.on('hit', () => {
            hit.play();
        });

        this.physics.world.checkCollision.left = false;
        this.physics.world.checkCollision.right = false;

        this.bulletPool = [];
        this.addPushListener(this.bulletPool, this.onBulletCreated);
        this.enemyPool = [];
        this.addPushListener(this.enemyPool, ()=>{});
        this.basePool = [];
        this.addPushListener(this.basePool, ()=>{})
        
        this.player = new Player({scene:this, x:0, y:110, name:'player', life: this.playerLifes});

        this.cameras.main.startFollow(this.player,false,1,0,0,0)

        this.enemySpawnTick = 0;

        this.physics.add.overlap(this.player, this.enemyPool, () => {
            this.player.enemyCollision();
        })

        this.itemPool = [];
        this.itemDelay = false;
        this.physics.add.overlap(this.player, this.itemPool, () => {
            this.itemPool[0].collected();
            this.sound.play("pickupItem");
        })


        this.registry.events.on('enemyDestroyed', () => {
            //WK für das Spawnen eines Items
            if(!this.itemDelay && Math.random() < 0.25) {
                this.itemSpawn();
            }
        });

        this.registry.events.on('gameOver', (distance) => {
            this.sound.play("GameOver");
            this.registry.events.removeAllListeners();
            this.backgroundMusic.stop();
            this.laserSound.stop();
            this.scene.stop('Gui'); 
            this.scene.launch('End');
            Statistic.push();
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

        this.registry.events.emit('onBaseStateChanged', this.basePool);
    }

    itemSpawn(){
        this.itemDelay = true;
        if(this.itemPool.length>0){
            this.itemPool[0].destroy();
            this.itemPool.pop();
        }
        let randomItem = Math.random();
        let sItem = null;
        if(randomItem>=0 && randomItem<0.4){
            sItem = new SpeedItem({scene:this, x:this.player.x+50, y:50}, this.player, 'speed');
        }
        else if(randomItem>=0.4 && randomItem<0.8){
            //anderes Item
            sItem = new LaserGun({scene:this, x:this.player.x+50, y:50}, this.player, 'item');
        }
        else if(randomItem>=0.8 && randomItem<=1){
            //anderes Item
            sItem = new ProtectionItem({scene:this, x:this.player.x+50, y:50}, this.player, 'unverwundbar');
        }
        this.itemPool.push(sItem);
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.itemDelay = false;
            }
        });
    }

    baseSpawn(min, max){
        for(let i = 0; i < 10; i++) {
            let offset = i * (max-min)/10;
            let randomX = Phaser.Math.Between(min+offset+5, min+offset + (max-min)/10-5);
            let randomY = Phaser.Math.Between(10,190);

            let base1 = new Base({scene: this, x: randomX, y: randomY}, this.baseImage);
            this.basePool.push(base1);
        }
    }

    update(time, delta) {
        this.bg.updatePosition(this.aestheticOffset + this.cameras.main.scrollX);
        this.player.joyStickForce = this.joyStick.force;
        this.player.joyStickAngle = this.joyStick.angle;
        this.player.update(time, delta);

        this.cameraOffset = this.state == this.states.boss ? -90 : 0;
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

        if(this.bossSpawned == true) {
            if(this.boss.active == false) {
                this.state = this.states.done;
                this.initEnd();
            }
        }
    }

    initEnd() {
        if(!this.endedAnim) {
            this.endedAnim = true;
            this.cameras.main.fadeOut(1000,255,255,255,(cam, progress)=>{ 
                if(progress == 1) {
                    this.backgroundMusic.stop();
                    this.laserSound.stop();
                    this.scene.stop(); 

                    if(stageConfigs.levels().length == this.stageIndex+1) {
                        this.registry.events.removeAllListeners();
                        this.scene.stop("Background");
                        this.scene.stop("Gui");
                        this.scene.start("Menu");
                    } else {
                        let config = stageConfigs.levels()[this.stageIndex+1];
                        config.playerLifes = this.player.life;
                        config.points = this.points;
                        config.stageIndex = this.stageIndex + 1;
                        this.scene.restart(config);
                    }
                    Statistic.push();
                }
            });
        }
            
    }

    addPushListener(arr, callback) {
        arr.push = (e) => {
            Array.prototype.push.call(arr, e);
            callback(this, e);
        };
    }

    onBulletCreated(context, bullet) {
        context.physics.add.overlap(bullet, context.enemyPool.concat(context.basePool), (bullet, enemy) => {
            Phaser.GameObjects.Sprite.prototype.destroy.call(bullet);
            enemy.takeDamage(30);
        });
        context.time.addEvent({
            delay: 300,
            callback: () => {
                Phaser.GameObjects.Sprite.prototype.destroy.call(bullet);
            }
        });
    }

    removeEnemy(enemy) {
        enemy.destroy();
        this.addPoints(10);
        this.sound.play('enemyExplosion');
        Statistic.localdata.defeatedEnemy += 1;
    }

    removeBase(base) {
        base.destroy();
        
        let activeCount = 0;
        for(let base of this.basePool) {
            if(base.active == true) {
                activeCount ++;
            }
        }

        if(activeCount <= 0) {
            for(let base of this.basePool) {
                base.destroy();
            }
            this.factory.deactivate();
            this.bossSpawn(this);
            this.state = 1;
            this.player.lockRight = true;
        }

        this.addPoints(50);
        this.registry.events.emit('onBaseStateChanged', this.basePool);
    }

    addPoints(points) {
        this.points += points;
        this.defeatedEnemy += 1;
        Statistic.localdata.score += points;
        this.registry.events.emit('onPointsChanged', this.points);
    }

}
