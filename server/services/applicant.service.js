const knex = require('../database/knex');

class ApplicantService {
    constructor() {}

    getAll() {
        return knex('applicant')
            .select();
    }

    getAllApplicantsView(){
        return knex('applicant as a')
            .innerJoin('departments as d', {'d.id': 'a.department_id'})
            .select(['a.id','a.date','a.time','a.first_name','a.last_name','a.contact_no','a.department_id','a.isDone', 'd.department']);
    }

    get(id) {
        return knex('applicant as a')
            .innerJoin('departments as d', {'d.id': 'a.department_id'})
            .select(['a.id','a.date','a.time','a.first_name','a.last_name','a.contact_no','a.department_id','a.isDone', 'd.department'])
            .where('a.id',id);
    }

    create(obj) {
        return knex('applicant')
            .returning('id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('applicant')
            .where('id','=',id)
            .returning('id')
            .update(obj);
    }

    delete(id) {
        return knex('applicant')
            .where('id','=',id)
            .del()
    }

}

module.exports = ApplicantService;
