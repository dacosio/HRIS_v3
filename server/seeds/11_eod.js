exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('end_of_day').del()
    .then(function () {
      // Inserts seed entries
      return knex('end_of_day').insert([{
        "accomplishments": "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
        "impediments": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
        "next_day_target": "Nulla facilisi. Cras non velit nec nisi vulputate nonummy.",
        "concerns": "In hac habitasse platea dictumst.",
        "created_by": 1
      }, {
        "accomplishments": "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "impediments": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "next_day_target": "Proin eu mi. Nulla ac enim.",
        "concerns": "Suspendisse ornare consequat lectus.",
        "created_by": 3
      }, {
        "accomplishments": "Etiam vel augue.",
        "impediments": "In blandit ultrices enim.",
        "next_day_target": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.",
        "concerns": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
        "created_by":2
      }, {
        "accomplishments": "Maecenas ut massa quis augue luctus tincidunt.",
        "impediments": "Nulla ut erat id mauris vulputate elementum.",
        "next_day_target": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
        "concerns": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.",
        "created_by": 3
      }]);
    });
};