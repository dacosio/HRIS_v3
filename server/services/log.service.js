const knex = require('../database/knex');

class LogService {
    constructor() {}

    getAll() {
        return knex('logs')
            .select();
    }


    get(id) {
        return knex('logs')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('logs')
            .returning(['id','created_at','time_in', 'time_out'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('logs')
            .returning(['id','created_at','time_in', 'time_out'])
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('logs')
            .where('id','=',id)
            .del()
    }

}

module.exports = LogService;
