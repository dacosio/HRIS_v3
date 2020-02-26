
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('leaves').del()
    .then(function () {
      // Inserts seed entries
      return knex('leaves').insert([{
        "leave_type": 3,
        "from_date": "2020-06-22",
        "to_date": "2020-06-22",
        "reason": "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.",
        "created_by" : 1,
        "leave_type" :1 
      }, {
        "leave_type": 2,
        "from_date": "2020-06-22",
        "to_date": "2020-06-22",
        "reason": "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
        "created_by" : 2,
        "leave_type" : 3

      }, {
        "leave_type": 1,
        "from_date": "2020-06-22",
        "to_date": "2020-06-22",
        "reason": "Integer ac leo. Pellentesque ultrices mattis odio.",
        "created_by" : 3,
        "leave_type" :1 

        
      }]);
    });
};
