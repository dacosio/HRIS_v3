exports.up = function (knex) {
    return knex.schema.createTable('employees', (table) => {
            table.increments('id').primary();
            table.string('first_name', 80).notNullable();
            table.string('last_name', 80).notNullable();
            table.string('position', 250).notNullable();
            table.date('birthday').notNullable();
            table.string('gender').notNullable();
            table.string('contact_no').notNullable();
            table.timestamp('date_hired').defaultTo(knex.fn.now());
            table.string('address').defaultTo(null);
            table.string('city').defaultTo(null);
            table.string('state').defaultTo(null);
            table.integer('zip_code').defaultTo(null);
            table.boolean('isDeleted').defaultTo(0);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('modified_at').defaultTo(null);
            table.integer('department_id').unsigned().notNullable();
            table.integer('role_id').unsigned().notNullable();
            table.integer('supervisor_id').unsigned().notNullable();
            table.foreign('department_id').references('departments.id');
            table.foreign('role_id').references('roles.id');
            table.foreign('supervisor_id').references('employees.id');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('employees');
};