const knex = require('../database/knex');

class DependentService {
    constructor() {}

    getAll() {
        return knex('dependents')
            .select();
    }

    getByEmployee(id){
        return knex('dependents')
            .where({
                employee_id : id
            })
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
            .returning(['id', 'first_name', 'last_name','birthday','relationship', 'contact_no'])
            // .returning('id')
            .insert(obj)
    }

    update(id,obj) {
        return knex('dependents')
            .returning(['id', 'first_name', 'last_name','birthday','relationship', 'contact_no'])
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('dependents')
            .returning(['id', 'first_name', 'last_name','birthday','relationship', 'contact_no'])
            .where('id','=',id)
            .del()
    }

}

module.exports = DependentService;
