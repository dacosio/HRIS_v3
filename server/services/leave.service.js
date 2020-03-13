const knex = require("../database/knex");

class LeaveService {
  constructor() {}

  getAll() {
    return knex("leaves").select();
  }

  getAllLeaveRequest() {
    return knex.select();
  }

  getAllLeaveRequestByEmployee(id) {
    return knex
      .select(
        "e.first_name",
        "e.last_name",
        "e.position",
        "l.leave_type",
        "l.from_date",
        "l.to_date",
        "l.reason",
        "l.created_at",
        "d.department"
      )
      .from("leaves AS l")
      .innerJoin("employees AS e", "l.id", "e.id")
      .innerJoin("departments AS d", "d.id", "e.id")
      .Where("e.id", "=", id)
      .andWhere("l.isAccepted", "=", false);
  }

  getLeaveforApproval() {
    return knex
      .select(
        "l.id",
        "e.first_name",
        "e.last_name",
        "l.reason",
        "l.from_date",
        "l.to_date",
        "lt.type",
        "l.isAccepted",
        "l.isDeleted"
      )
      .from("employees as e")
      .innerJoin("leaves as l", "e.id", "l.created_by")
      .innerJoin("leave_type as lt", "lt.id", "l.leave_type")
      .where("supervisor_id", "=", 1); //todo
  }

  get(id) {
    return knex("leaves")
      .where({
        id: id
      })
      .select();
  }

  create(obj) {
    return knex("leaves")
      .returning(["id", "from_date", "to_date", "reason", "leave_type"])
      .insert(obj);
  }

  update(id, obj) {
    return knex("leaves")
      .where("id", "=", id)
      .update(obj);
  }

  delete(id) {
    return knex("leaves")
      .where("id", "=", id)
      .del();
  }

  delete(id) {
    return knex("leaves")
      .where("id", "=", id)
      .del();
  }
}

module.exports = LeaveService;
