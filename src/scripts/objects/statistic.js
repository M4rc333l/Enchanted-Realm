import request from '../../scripts/request.js';

export default{
    data() {
        return {
            score: '',
            defeatedEnemy: '',
            distance: ''
        }
    },
    methods: {
        async gameStatistic(score, defeatedEnemy, distance) {
            let result = await request('/gameStatistic', 'POST', {score:score,
                defeatedEnemy:defeatedEnemy, distance:distance});
            if(result.status != 200) {
                this.message = result.body.msg;
            }
        }
    }
}