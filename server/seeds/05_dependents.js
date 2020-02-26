
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dependents').del()
    .then(function () {
      // Inserts seed entries
      return knex('dependents').insert([{
        "first_name": "Weylin",
        "last_name": "Mastrantone",
        "birthday": "2017-08-15",
        "relationship": "father",
        "contact_no": "8038515358",
        "employee_id": 3
        
      }, {
        "first_name": "Noland",
        "last_name": "Pichan",
        "birthday": "2017-08-15",
        "relationship": "mother",
        "contact_no": "5309295313",
        "employee_id": 3
        
      }, {
        "first_name": "Abel",
        "last_name": "O'Kenny",
        "birthday": "2017-08-15",
        "relationship": "child",
        "contact_no": "2435785747",
        "employee_id": 3
        
      }]);
    });
};
