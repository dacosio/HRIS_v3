
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('applicant').del()
    .then(function () {
      // Inserts seed entries
      return knex('applicant').insert([{
        "id": 1,
        "first_name": "Gorden",
        "last_name": "Stansfield",
        "contact_no": "5759730169",
        "date": "2020-06-22",
        "time": "8:10:25",
        "department_id": 1,
        "created_by" : 1

      }, {
        "id": 2,
        "first_name": "Durant",
        "last_name": "Riep",
        "contact_no": "6411096597",
        "date": "2020-06-22",
        "time": "8:10:25",
        "department_id": 2,
        "created_by" : 1

      }, {
        "id": 3,
        "first_name": "Dane",
        "last_name": "Arundell",
        "contact_no": "5969233463",
        "date": "2020-06-22",
        "time": "8:10:25",
        "department_id": 3,
        "created_by" : 1

      }]);
    });
};
