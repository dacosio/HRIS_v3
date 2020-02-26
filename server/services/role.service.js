const knex = require('../database/knex');

class RoleService {
    constructor() {}

    getAll() {
        return knex('roles')
            .select();
    }

    get(id) {
        return knex('roles')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('roles')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('roles')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('roles')
            .where('id','=',id)
            .del()
    }

}

module.exports = RoleService;
