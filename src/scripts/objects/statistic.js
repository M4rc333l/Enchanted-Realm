import request from '../../scripts/request.js';

export default{
    initialized: false,
    username: '',
    highscore: 0,
    globaldata: {
        score: 0,
        defeatedEnemy: 0,
        distance: 0
    },
    localdata: {
        score: 0,
        defeatedEnemy: 0,
        distance: 0
    },
    achievements: [],
    pushLocalToGlobal() {
        this.globaldata.score += this.localdata.score;
        this.globaldata.defeatedEnemy += this.localdata.defeatedEnemy;
        this.globaldata.distance += this.localdata.distance;
        this.localdata.score = 0;
        this.localdata.defeatedEnemy = 0;
        this.localdata.distance = 0;
    },
    calculateGlobal() {
        return {
            score: this.globaldata.score + this.localdata.score,
            defeatedEnemy: this.globaldata.defeatedEnemy + this.localdata.defeatedEnemy,
            distance: this.globaldata.distance + this.localdata.distance,
        }
    }
    ,async getAchievements() {
        let result = await request('/achievements', 'GET');
        if(result.status == 200) {
            this.achievements = result.body;
            console.log(result.body);
        }
    },
    getSucceededAchievements() {
        let succeededAchievements = [];
        let _value = 0;
        let data = {};
        for(let achievement of this.achievements) {
            data = achievement.global == 0 ? this.localdata : this.calculateGlobal();
            switch(achievement.type) {
                case "kills": _value = data.defeatedEnemy; break;
                case "distance": _value = data.distance; break;
                case "score": _value = data.score; break;
            }
            if(_value >= achievement.amount) {
                succeededAchievements.push(achievement.a_id);
            }
        }
        return succeededAchievements;
    },
    async push() {
        await this.gameStatistic(this.localdata.score, this.localdata.defeatedEnemy, this.localdata.distance);
        let succeededAchievements = this.getSucceededAchievements();
        await request('/achievements', 'POST', {achievements:succeededAchievements.join(",")});
        this.pushLocalToGlobal();

        let newAchievements = [];
        for(let achievement of this.achievements) {
            if(succeededAchievements.includes(achievement.a_id) && achievement.done == 0) {
                newAchievements.push(achievement);
                achievement.done = 1;
            }
        }
        
        return newAchievements;
    },
    async gameStatistic(score, defeatedEnemy, distance) {
        let result = await request('/gameStatistic', 'POST', {score:score,
            defeatedEnemy:defeatedEnemy, distance:distance});
        if(result.status !== 200) {
            this.message = result.body.msg;
        }
    }
}