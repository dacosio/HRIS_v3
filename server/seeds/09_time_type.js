exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('time_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('time_type').insert([{

          type : 'overtime'
        },
        {
          type : 'undertime'
        },
      
      ]);
    });
};