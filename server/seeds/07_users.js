
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        "email": "bmalden0",
        "password": "123",
        "employee_id": 1
      }, {
        "email": "gnoble1",
        "password": "123",
        "employee_id": 2
      }, {
        "email": "bbegin2",
        "password": "123",
        "employee_id": 3
      }]);
    });
};
