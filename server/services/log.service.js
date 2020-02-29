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
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('logs')
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
