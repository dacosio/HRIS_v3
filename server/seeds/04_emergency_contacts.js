exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('emergency_contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('emergency_contacts').insert([{
        "first_name": "Giana",
        "last_name": "Galura",
        "relationship": "Father",
        "contact_no": "0061146889",
        "address": "152 Petterle Road",
        "city": "Flint",
        "state": "Michigan",
        "zip_code": 1234,
        "employee_id": 1
      }, {
        "first_name": "Hinze",
        "last_name": "Giffon",
        "relationship": "Mother",
        "contact_no": "4673736648",
        "address": "2 Scofield Trail",
        "city": "Miami",
        "state": "Florida",
        "zip_code": 1234,
        "employee_id": 2
      }, {
        "first_name": "Merle",
        "last_name": "Dilon",
        "relationship": "Sister",
        "contact_no": "4281637109",
        "address": "2 Roxbury Way",
        "city": "Loretto",
        "state": "Minnesota",
        "zip_code": 1234,
        "employee_id": 2
      }]);
    });
};