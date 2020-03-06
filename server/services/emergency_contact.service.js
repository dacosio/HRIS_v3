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
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no','address','city','state','zip_code'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no','address','city','state','zip_code'])
            .update(obj);
    }

    delete(id) {
        return knex('emergency_contacts')
            .where('id','=',id)
            .returning(['id', 'first_name', 'last_name','relationship', 'contact_no','address','city','state','zip_code'])
            .del()
    }

}

module.exports = EmergencyContactService;
