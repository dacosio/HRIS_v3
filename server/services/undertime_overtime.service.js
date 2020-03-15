const knex = require("../database/knex");

class UndertimeOvertimeService {
  constructor() {}

  getAll(id) {
    return knex("undertime_overtime")
    .where({created_by: id})
    .select();
  }

  get(id) {
    return knex("undertime_overtime")
      .where({
        id: id
      })
      .select();
  }

  getTimeForApproval(id) {
    return knex
      .select(
        "uo.id",
        "e.first_name",
        "e.last_name",
        "uo.from_time",
        "uo.to_time",
        "tt.type",
        "uo.reason",
        "uo.status",
      )
      .from("employees AS e")
      .innerJoin("undertime_overtime AS uo", "e.id", "uo.created_by")
      .innerJoin("time_type AS tt", "uo.time_type", "tt.id")
      .where("uo.status",'=',0)
      .andWhere("e.supervisor_id", "=", id); //todo
  }

 

  create(obj) {
    return knex("undertime_overtime")
      .returning([
        "id",
        "date_filed",
        "from_time",
        "to_time",
        "reason",
        "time_type",
        "status"
      ])
      .insert(obj);
  }

  update(id, obj) {
    return knex("undertime_overtime")
      .where("id", "=", id)
      .update(obj);
  }

  delete(id) {
    return knex("undertime_overtime")
      .where("id", "=", id)
      .del();
  }
}

module.exports = UndertimeOvertimeService;
