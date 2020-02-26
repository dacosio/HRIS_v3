
exports.up = function(knex) {
    return knex.schema.createTable('logs', (table) => {
        table.increments('id').primary();
        table.timestamp('time_in').defaultTo(null);
        table.timestamp('time_out').defaultTo(null);
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('created_by').unsigned().notNullable();
        
        table.foreign('created_by').references('employees.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('logs');
};
