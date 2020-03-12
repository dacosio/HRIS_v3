const knex = require('../database/knex');

class EmployeeService {
    constructor() {}

    getAll() {
        return knex('employees')
            .select();
    }

    

    getAllDetail() {
        return knex('employees as e')
            .innerJoin('departments as dp', 'dp.id','e.department_id')
            .select(['e.id','e.first_name', 'e.last_name','e.date_hired','e.department_id','dp.department','e.position','e.department_id','dp.department']);
    }

    
    create(obj) {
        return knex('employees')
            .returning(['id',"first_name","last_name","position","birthday","gender","contact_no","date_hired","address","city","state","zip_code","department_id","role_id","supervisor_id"])
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
