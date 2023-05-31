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
            }
        ]
    }
}