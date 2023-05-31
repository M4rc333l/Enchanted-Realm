import Enemy from '../enemy.js';

export default class Base extends Enemy {
    constructor(config, image) {
        super(config, image);
        this._x = config.x;
        this._y = config.y;
        this.body.setSize(14, 12);
    }
    
    delete(){
        this.context.removeBase(this);
    }
}