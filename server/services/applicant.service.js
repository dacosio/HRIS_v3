const knex = require('../database/knex');

class ApplicantService {
    constructor() {}

    getAll() {
        return knex('applicant')
            .select();
    }

    get(id) {
        return knex('applicant')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('applicant')
            .returning(['id','date','time','first_name','last_name','contact_no','isDone'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('applicant')
            .where('id','=',id)
            .returning(['id','date','time','first_name','last_name','contact_no','isDone'])
            .update(obj);
    }

    delete(id) {
        return knex('applicant')
            .where('id','=',id)
            .del()
    }

}

module.exports = ApplicantService;
