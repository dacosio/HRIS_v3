const knex = require('../database/knex');

class EmployeeService {
    constructor() {}

    getAll() {
        return knex('employees')
            .select();
    }

    get(id) {
        return knex('employees')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('employees')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('employees')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('employees')
            .where('id','=',id)
            .del()
    }

}

module.exports = EmployeeService;
