exports.up = function (knex) {
    return knex.schema.createTable('leave_type', (table) => {
        table.increments('id').primary();
        table.string('type').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('leave_type');

};