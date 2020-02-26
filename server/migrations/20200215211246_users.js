
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('employee_id').unsigned().notNullable();

        table.foreign('employee_id').references('employees.id');
     });
 };
 
 exports.down = function(knex) {
     return knex.schema.dropTable('users');
 
 };
 