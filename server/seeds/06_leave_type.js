exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('leave_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('leave_type').insert([{

          type : 'vacation leave'
        },
        {
          type : 'sick leave'
        },
        {
          type : 'compassionate leave'
        }
        ,
        {
          type : 'paternity leave',

        }
        ,
        {
          type: 'maternity leave'
        }
      ]);
    });
};