
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logs').del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([{
        "time_in": "2020-06-22 08:10:25",
        "time_out": "2020-06-22 19:10:25",
        "created_by" : 1
      }, {
        "time_in": "2020-06-22 08:10:25",
        "time_out": "2020-06-22 19:10:25",
        "created_by" : 1
      }, {
        "time_in": "2020-06-22 08:10:25",
        "time_out": "2020-06-22 19:10:25",
        "created_by" : 1
      }]);
    });
};
