const knex = require('../database/knex');

class EmergencyContactService {
    constructor() {}

    getAll() {
        return knex('emergency_contacts')
            .select();
    }

    get(id) {
        return knex('emergency_contacts')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('emergency_contacts')
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no'])
            .update(obj);
    }

    delete(id) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no'])
            .del()
    }

}

module.exports = EmergencyContactService;
