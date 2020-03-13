const knex = require("../database/knex");

class UndertimeOvertimeService {
  constructor() {}

  getAll() {
    return knex("undertime_overtime").select();
  }

  get(id) {
    return knex("undertime_overtime")
      .where({
        id: id
      })
      .select();
  }

  getTimeForApproval() {
    return knex
      .select(
        "uo.id",
        "e.first_name",
        "e.last_name",
        "uo.from_time",
        "uo.to_time",
        "tt.type",
        "uo.reason"
      )
      .from("employees AS e")
      .innerJoin("undertime_overtime AS uo", "e.id", "uo.created_by")
      .innerJoin("time_type AS tt", "uo.time_type", "tt.id")
      .where("e.supervisor_id", "=", 1); //todo
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
        "isAccepted"
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

  getAll() {
    return knex("undertime_overtime").select();
  }

  get(id) {
    return knex("undertime_overtime")
      .where({
        id: id
      })
      .select();
  }

  getTimeForApproval() {
    return knex
      .select(
        "e.first_name",
        "e.last_name",
        "uo.from_time",
        "uo.to_time",
        "tt.type",
        "uo.reason"
      )
      .from("employees AS e")
      .innerJoin("undertime_overtime AS uo", "e.id", "uo.created_by")
      .innerJoin("time_type AS tt", "uo.time_type", "tt.id")
      .where("e.supervisor_id", "=", 1);

    // return knex
    //   .select("e.first_name", "uo.date_filed")
    //   .from("employees as e")
    //   .innerJoin("udertime_overtime as uo", "e.id", "uo.created_by");
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
        "isAccepted"
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
