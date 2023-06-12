
export default class Gui extends Phaser.Scene {
    constructor() {
        super({key: 'Gui'});
    }
    init (data){
        this.scene.moveUp();
        this.points = data.points == undefined ? 0 : data.points;
        this.playerLifes = data.playerLifes == undefined ? 3 : data.playerLifes;
    }
    preload(){
        this.load.image('heart_red', '../../assets/objects/heart_red.png')
        this.load.image('heart_container', '../../assets/objects/heart_container.png')
        this.load.image('base_container', '../../assets/gui/base_container.png')
        this.load.image('base_filled_container', '../../assets/gui/base_filled_container.png')
    }
    create (){

        this.heartGroup = this.add.group({
            key: 'heart_container',
            repeat: 2,
            setXY: {
                x: 20,
                y: 20,
                stepX: 25
            }
        })

        this.heartGroup = this.add.group({
            key: 'heart_red',
            repeat: this.playerLifes - 1,
            setXY: {
                x: 20,
                y: 20,
                stepX: 25
            }
        })

        this.baseGroup = this.add.group({
            key: 'base_filled_container',
            repeat: 9,
            setXY: {
                x: 320/2 - 60,
                y: 218,
                stepX: 12
            }
        })

        /*this.life1 = this.add.group({
            key: 'heart_red',
            repeat: 1,
            setXY: {
                x: 20,
                y: 200,
                stepX: 25
            }
        })*/

        this.pointLabel = this.add.text(280, 10, this.points);

        this.itemLabel = this.add.text(120, 10, "Item: ");

        this.registry.events.on('onPointsChanged', (points) => {
            this.pointLabel.setText(points);
        });

        this.registry.events.on('activateItem', (preview) => {
            this.itemLabel.setText(this.itemLabel.text+preview);
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.itemLabel.setText("Item: ");
                }
            });
        });

        this.registry.events.on('onBaseStateChanged', (basePool) => {
            for(let i = 0; i < 10; i++) {
                let texture = basePool[i].active == true ? 'base_filled_container' : 'base_container';
                this.baseGroup.children.entries[i].setTexture(texture);
            }
        });

        this.registry.events.on('onLifeStateChanged', (lifes) => {
            for(let i = 0; i < this.heartGroup.getLength(); i++) {
                this.heartGroup.children.entries[i].visible = i < lifes
            }
        });
    }


    

}