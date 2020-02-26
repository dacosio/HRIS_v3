
exports.up = function(knex) {
    return knex.schema.createTable('roles', (table) => {
        table.increments('id').primary();
        table.string('role').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles');

};
