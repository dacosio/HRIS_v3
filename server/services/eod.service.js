const knex = require('../database/knex');

class EodService {
    constructor() {}

    getAll() {
        return knex('end_of_day')
            .select();
    }

    get(id) {
        return knex('end_of_day')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('end_of_day')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('end_of_day')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('end_of_day')
            .where('id','=',id)
            .del()
    }

}

module.exports = EodService;
