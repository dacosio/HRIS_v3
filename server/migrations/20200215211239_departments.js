
exports.up = function(knex) {
    return knex.schema.createTable('departments', (table) => {
        table.increments('id').primary();
        table.string('department').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
    }); 
};

exports.down = function(knex) {
    return knex.schema.dropTable('departments');

};
