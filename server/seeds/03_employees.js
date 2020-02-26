
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([{

        "first_name": "Adair",
        "last_name": "Clapham",
        "position": "Account Executive",
        "birthday": "2017-08-15",
        "gender": "Male",
        "contact_no": "7220071159",
        "date_hired": "2020-06-22 08:10:25",
        "address": "13386 Anniversary Way",
        "city": "Richmond",
        "state": "Virginia",
        "zip_code": "23272",
        "department_id" : 1,
        "role_id" : 1,
        "supervisor_id": 1

      }, {
        "first_name": "Marcus",
        "last_name": "Jaray",
        "position": "Health Coach II",
        "birthday": "2017-08-15",
        "gender": "Male",
        "contact_no": "6330251460",
        "date_hired": "2020-06-22 08:10:25",
        "address": "03 Corry Junction",
        "city": "Fort Wayne",
        "state": "Indiana",
        "zip_code": "46814",
        "department_id" : 2,
        "role_id" : 2,
        "supervisor_id": 1

      }, {
        "first_name": "Evita",
        "last_name": "Clemoes",
        "position": "Food Chemist",
        "birthday": "2017-08-15",
        "gender": "Female",
        "contact_no": "6798640664",
        "date_hired": "2020-06-22 08:10:25",
        "address": "6540 Warbler Way",
        "city": "Austin",
        "state": "Texas",
        "zip_code": "78789",
        "department_id" : 3,
        "role_id" : 3,
        "supervisor_id": 1

      }]);
    });
};
