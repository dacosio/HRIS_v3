exports.up = function (knex) {
    return knex.schema.createTable('applicant', (table) => {
        table.increments('id').primary();
        table.date('date').defaultTo(null);
        table.time('time').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('contact_no').notNullable();
        table.boolean('isDone').defaultTo(0);
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('department_id').unsigned().notNullable();
        table.integer('created_by').unsigned().notNullable();
        
        table.foreign('department_id').references('departments.id')
        table.foreign('created_by').references('employees.id');

    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('applicant');
};