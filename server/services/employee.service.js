const knex = require('../database/knex');

class EmployeeService {
    constructor() {}

    getAll() {
        return knex('employees')
            .select();
    }

    getAllDetail() {
        return knex.select(
            'e.id',
            knex.raw(`CONCAT(e.first_name,' ',e.last_name) as employee`),
            'e.contact_no',
            'e.position',
            'dp.department',
            knex.raw(`CONCAT(ec.first_name,' ',ec.last_name) as emergency_contact`),
            'ec.contact_no as ecnum',
            knex.raw(`CONCAT(d.first_name,' ',d.last_name) as dependents`),
            )
            .from('employees as e')
            .innerJoin('departments as dp','e.id','dp.id')
            .innerJoin('dependents as d','e.id','d.id')
            .innerJoin('emergency_contacts as ec','e.id','ec.id')

     
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
