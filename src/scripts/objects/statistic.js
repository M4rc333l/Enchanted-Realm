import request from '../../scripts/request.js';

export default{
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
    },
    async getAchievements() {
        let result = await request('/achievements', 'GET');
        this.achievements = result;
        console.log(result);
    },
    methods: {
        async gameStatistic(score, defeatedEnemy, distance) {
            let result = await request('/gameStatistic', 'POST', {score:score,
                defeatedEnemy:defeatedEnemy, distance:distance});
            if(result.status !== 200) {
                this.message = result.body.msg;
            }
        }
    }
}