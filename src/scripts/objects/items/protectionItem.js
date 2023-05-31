import Item from "../item";

export default class ProtectionItem extends Item {
    constructor(config, player, image) {
        super(config, player, image);
        this.player = player;
    }
    collected(){
        this.scene.registry.events.emit('activateItem', 'Immortal');
        this.player.delay = true;
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.player.delay = false;
            }
        });
        this.destroy();
    }
}