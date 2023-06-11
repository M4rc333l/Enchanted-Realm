import Item from "../item";

export default class LaserGun extends Item {
    constructor(config, player, image) {
        super(config, player, image);
        this.player = player;
    }
    collected(){
        this.scene.registry.events.emit('activateItem', 'Laser');
        this.player.hasLaser = true;
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.player.hasLaser = false;
                this.player.laser.deactivate();
            }
        });
        this.destroy();
    }
}