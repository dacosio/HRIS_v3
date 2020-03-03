const knex = require('../database/knex');

class UndertimeOvertimeService {
    constructor() {}

    getAll() {
        return knex('undertime_overtime')
            .select();
    }

    get(id) {
        return knex('undertime_overtime')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('undertime_overtime')
            .returning(['id','date_filed','from_time','to_time','reason', 'time_type','isAccepted'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('undertime_overtime')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('undertime_overtime')
            .where('id','=',id)
            .del()
    }

}

module.exports = UndertimeOvertimeService;
