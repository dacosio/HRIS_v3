
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('undertime_overtime').del()
    .then(function () {
      // Inserts seed entries
      return knex('undertime_overtime').insert([{
        "date_filed": "2020-06-22",
        "from_time": "8:10:25",
        "to_time": "9:10:25",
        "reason": "Quisque id ju",
        "time_type": 1, //1 is equivalent to overtime
        "created_by" : 2
      }, {
        "date_filed": "2020-06-22",
        "from_time": "8:10:25",
        "to_time": "9:10:25",
        "reason": "Lorem ipsuminterdum in, ante",
        "time_type": 2, //2 is equivalent to undertime
        "created_by" : 1
      }, {
        "date_filed": "2020-06-22",
        "from_time": "08:10:25",
        "to_time": "09:10:25",
        "reason": "In tempor. Duis bibendum",
        "time_type": 2,
        "created_by" : 3
      }]);
    });
};
