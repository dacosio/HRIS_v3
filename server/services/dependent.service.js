const knex = require('../database/knex');

class DependentService {
    constructor() {}

    getAll() {
        return knex('dependents')
            .select();
    }

    get(id) {
        return knex('dependents')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('dependents')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('dependents')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('dependents')
            .where('id','=',id)
            .del()
    }

}

module.exports = DependentService;
