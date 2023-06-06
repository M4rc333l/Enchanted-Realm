import request from '../../scripts/request.js';

export default{
    data() {
        return {
            defeatedEnemys: '',
            distance: '',
            score: ''
        }
    },
    methods: {
        async gameStatistic(defeatedEnemys, distance, score) {
            let result = await request('/gameStatistic', 'POST', {defeatedEnemys:defeatedEnemys,
                distance:distance, score:score});
            if(result.status != 200) {
                this.message = result.body.msg;
            }
        }
    }
}