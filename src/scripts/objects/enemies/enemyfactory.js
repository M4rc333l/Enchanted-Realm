export default class EnemyFactory {
    constructor(config) {
        this.context = config.context;
        this.pattern = config.pattern;
        this.timers = [];
    }
    create() {
        for(let i = 0; i < this.pattern.length; i++) {
            if(!this.pattern[i].repeat) {
                this.pattern[i].repeat = 1;
            }
            if(!this.pattern[i].interval) {
                this.pattern[i].interval = 5000;
            }
            if(!this.pattern[i].repeatInterval) {
                this.pattern[i].repeatInterval = 1000;
            }
            if(!this.pattern[i].creationMethod) {
                this.pattern[i].creationMethod = (context, state, timer)=>{};
            }
            if(!this.pattern[i].preCreation) {
                this.pattern[i].preCreation = (context, state, timer)=>{};
            }
            if(!this.pattern[i].state) {
                this.pattern[i].state = {};
            }
            
        }

        for(let i = 0; i < this.pattern.length; i++) {   
            let outertimer = this.context.time.addEvent({
                delay: this.pattern[i].interval,
                loop: true,
                callback: () => {
                    let innertimer = this.context.time.addEvent({
                        delay:this.pattern[i].repeatInterval,
                        repeat:this.pattern[i].repeat,
                        callback: ()=> {
                            this.pattern[i].creationMethod(this.context, this.pattern[i].state, innertimer);
                        }
                    });

                    this.pattern[i].preCreation(this.context, this.pattern[i].state, outertimer);
                }
            });
            this.timers.push(outertimer);
        }
    }

    deactivate() {
        for(let timer of this.timers) {
            timer.paused = true;
        }
    }

    activate() {
        for(let timer of this.timers) {
            timer.paused = false;
        }
    }
}