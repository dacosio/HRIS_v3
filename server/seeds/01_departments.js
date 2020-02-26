exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('departments').del()
    .then(function () {
      const departments = [{
          "department": "Engineering",
        }, {
          "department": "Human Resource Management"
        }, {
          "department": "Marketing and Sales"
        }, {
          "department": "Accounting and Finance"
        }, {
          "department": "Purchasing and Logistics"
        }, {
          "department": "Operations"
        }, {
          "department": "Information System"
        }, {
          "department": "Software Development"
        }, {
          "department": "Operations"
        }

      ];
      // Inserts seed entries
      return knex('departments').insert(departments);
    });
};