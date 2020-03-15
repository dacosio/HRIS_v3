const knex = require('../database/knex');

class EodService {
    constructor() {}

    getAll(id) {
        return knex('end_of_day')
        .where({created_by: id})
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
            .returning(['id','accomplishments','impediments','concerns','next_day_target','created_at','created_by'])
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
