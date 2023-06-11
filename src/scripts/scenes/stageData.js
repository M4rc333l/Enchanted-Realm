import Isaac from "../objects/enemies/hellscape/isaac";
import Enemy3 from "../objects/enemies/hellscape/enemy3";
import FireEnemy from '../objects/enemies/hellscape/fireenemy';

export default {
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
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;;
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
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;;
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
        ]
    },
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
                    let en = new FireEnemy({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, 'enemy');
                    en.body.setSize(20, 30);
                    context.enemyPool.push(en);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;;
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
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;;
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
                    let enemy3 = new Enemy3({scene: context, x: state.spawnX, y: state.randomY}, state.spawnSite, state.randomY, 'enemy3');
                    enemy3.body.setSize(13, 21);
                    context.enemyPool.push(enemy3);
                },
                preCreation: (context, state, timer) => {
                    timer.delay = Phaser.Math.Between(2000,10000);
                    state.spawnSite = Phaser.Math.Between(0,1);
                    state.randomY = Phaser.Math.Between(10,200);
                    state.spawnX = state.spawnSite == 0 ? context.cameras.main.scrollX - 500 : context.cameras.main.scrollX + 820;;
                }
            }
        ]
    }
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