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
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .del()
    }

}

module.exports = EmergencyContactService;
