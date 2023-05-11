import Item from "../item";

export default class LaserGun extends Item {
    constructor(config, player, image) {
        super(config, player, image);
        this.player = player;
    }
    collected(){
        this.scene.registry.events.emit('activateLaserItem');
        this.player.shootMaxTick = 0;
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.player.shootMaxTick = 40;
            }
        });
        this.destroy();
    }
}