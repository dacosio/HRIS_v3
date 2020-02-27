const knex = require('../database/knex');

class DepartmentService {
    constructor() {}

    getAll() {
        return knex('departments')
            .select();
    }

    get(id) {
        return knex('departments')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('departments')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('departments')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('departments')
            .where('id','=',id)
            .del()
    }

}

module.exports = DepartmentService;
