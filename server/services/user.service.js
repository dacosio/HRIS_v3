const knex = require('../database/knex');

class UserService {
    constructor() {}

    getAll() {
        return knex('users')
            .select();
    }


    getLeaveRequests(id) {
        return knex
            .select('f.friends_id', 'f.status', 'f.user_1','u.first_name AS firstname1','u.last_name AS lastname1','f.user_2','u2.first_name AS firstname2','u2.last_name AS lastname2')
            .from('friends AS f')
            .innerJoin('users AS u', 'f.user_1','u.user_id')
            .innerJoin('users AS u2', 'f.user_2','u2.user_id')
            .where('f.user_2','=',id)
            .andWhere('f.status','=',false);
    }

    get(id) {
        return knex('users')
            .where({
                id : id
            })
            .select();
    }

    create(obj) {
        return knex('users')
            .returning(['id','email'])
            .insert(obj);
    }

    update(id,obj) {
        return knex('users')
            .where('id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('users')
            .where('id','=',id)
            .del()
    }

    login(email, password) {
        return knex('users')
            .where({
                email: email,
                password: password
            })
            .select();
    }
}

module.exports = UserService;
