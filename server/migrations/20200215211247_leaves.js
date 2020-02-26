
exports.up = function(knex) {
    return knex.schema.createTable('leaves', (table) => {
        table.increments('id').primary();
        table.date('from_date').defaultTo(null);
        table.date('to_date').defaultTo(null);
        table.string('reason').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.boolean('isAccepted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('created_by').unsigned().notNullable();
        table.integer('leave_type').unsigned().notNullable();

        table.foreign('created_by').references('employees.id');
        table.foreign('leave_type').references('leave_type.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('leaves');
};
