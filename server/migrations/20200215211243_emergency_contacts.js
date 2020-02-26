exports.up = function (knex) {
    return knex.schema.createTable('emergency_contacts', (table) => {
        table.increments('id').primary();
        table.string('first_name', 80).notNullable();
        table.string('last_name', 80).notNullable();
        table.string('relationship').notNullable();
        table.string('contact_no').notNullable();
        table.string('address').defaultTo(null);
        table.string('city').defaultTo(null);
        table.string('state').defaultTo(null);
        table.integer('zip_code').defaultTo(null);
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('employee_id').unsigned().notNullable();

        table.foreign('employee_id').references('employees.id');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('emergency_contacts');
};