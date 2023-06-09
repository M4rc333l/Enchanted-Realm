import Isaac from "../objects/enemies/hellscape/isaac";
import Enemy3 from "../objects/enemies/hellscape/enemy3";
import FireEnemy from '../objects/enemies/hellscape/fireenemy';
import Glurak from "../objects/enemies/pokemon/glurak";

export default {
    pokescapeConfig: {
        backgroundConfig:{
            name: 'pokescape', 
            count:5, 
            bgWidth: 320
        },
        factoryPattern: [
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let en = new FireEnemy({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, 'enPoke1');
                    en.body.setSize(20, 30);
                    context.enemyPool.push(en);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let isaac = new Isaac({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, state.randomY, 'enPoke2');
                    isaac.body.setSize(20, 30);
                    context.enemyPool.push(isaac);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                    {
                        spawnSite:0,
                        randomY:0,
                        spawnX:0
                    },
                creationMethod: (context, state, timer) => {
                    let enemy3 = new Enemy3({scene: context, x: state.spawnX, y: state.randomY}, state.randomY, 'enPoke3');
                    enemy3.body.setSize(13, 21);
                    context.enemyPool.push(enemy3);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            }
        ],
        bossSpawn(context) {
            let __x = context.cameras.main.scrollX + 400;
            let __y = 100;
            context.bossSpawned = true;
            context.boss = new Glurak({ scene: context, x: __x, y: __y }, 'boss1','bossBullet1');
            context.boss.body.setSize(114, 80);
            context.enemyPool.push(context.boss);
        },
        baseImage: 'base1'
    },
    marioLand: {
        backgroundConfig:{
            name: 'marioland', 
            count:6, 
            bgWidth: 320
        },
        factoryPattern: [
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let en = new FireEnemy({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, 'enMario1');
                    en.body.setSize(20, 30);
                    context.enemyPool.push(en);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let isaac = new Isaac({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, state.randomY, 'enMario2');
                    isaac.body.setSize(20, 30);
                    context.enemyPool.push(isaac);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                    {
                        spawnSite:0,
                        randomY:0,
                        spawnX:0
                    },
                creationMethod: (context, state, timer) => {
                    let enemy3 = new Enemy3({scene: context, x: state.spawnX, y: state.randomY}, state.spawnX, 'enMario3');
                    enemy3.body.setSize(13, 21);
                    context.enemyPool.push(enemy3);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnX = context.cameras.main.scrollX + Phaser.Math.Between(0,320);
                }
            }
        ],
        bossSpawn(context) {
            let __x = context.cameras.main.scrollX + 400;
            let __y = 100;
            context.bossSpawned = true;
            context.boss = new Glurak({ scene: context, x: __x, y: __y }, 'boss2','bossBullet2');
            context.boss.body.setSize(114, 80);
            context.enemyPool.push(context.boss);
        },
        baseImage: 'base2'
    },
    hellscapeConfig: {
        backgroundConfig:{
            name: 'hellscape', 
            count:5, 
            bgWidth: 320
        },
        factoryPattern: [
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let en = new FireEnemy({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, 'enemy');
                    en.body.setSize(20, 30);
                    context.enemyPool.push(en);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                {
                    spawnSite:0, 
                    randomY:0, 
                    spawnX:0
                },
                creationMethod: (context, state, timer) => {
                    let isaac = new Isaac({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, state.randomY, 'enemy2');
                    isaac.body.setSize(20, 30);
                    context.enemyPool.push(isaac);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;
                }
            },
            {
                repeat:3,
                interval:3000,
                repeatInterval:300,
                state:
                    {
                        spawnSite:0,
                        randomY:0,
                        spawnX:0
                    },
                creationMethod: (context, state, timer) => {
                    let enemy3 = new Enemy3({scene: context, x: state.spawnX, y: state.randomY}, state.spawnX, 'enemy3');
                    enemy3.body.setSize(13, 21);
                    context.enemyPool.push(enemy3);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnX = context.cameras.main.scrollX + Phaser.Math.Between(0,320);
                }
            }
        ],
        bossSpawn(context) {
            let __x = context.cameras.main.scrollX + 400;
            let __y = 100;
            context.bossSpawned = true;
            context.boss = new Glurak({ scene: context, x: __x, y: __y }, 'boss3','bossBullet3');
            context.boss.body.setSize(114, 80);
            context.enemyPool.push(context.boss);
        },
        baseImage: 'base3'
    },
    levels() {return [this.pokescapeConfig, this.marioLand, this.hellscapeConfig]},
}