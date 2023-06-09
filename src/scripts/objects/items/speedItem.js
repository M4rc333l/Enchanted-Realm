import Item from "../item";

export default class SpeedItem extends Item {
    constructor(config, player, image) {
        super(config, player, image);
        this.player = player;
    }
    collected(){
        this.scene.registry.events.emit('activateItem', 'Speed');
        this.player.xspeed+= 0.02;
        this.player.yspeed+= 0.02;
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.player.xspeed-= 0.02;
                this.player.yspeed-= 0.02;
            }
        });
        this.destroy();
    }
}