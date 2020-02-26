exports.up = function (knex) {
    return knex.schema.createTable('dependents', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.date('birthday').notNullable();
        table.string('relationship').notNullable();
        table.string('contact_no').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('employee_id').unsigned().notNullable();

        table.foreign('employee_id').references('employees.id');
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable('dependents');
};