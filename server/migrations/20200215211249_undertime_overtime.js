
exports.up = function(knex) {
    return knex.schema.createTable('undertime_overtime', (table) => {
        table.increments('id').primary();
        table.date('date_filed').notNullable(); //has to be default date now?
        table.time('from_time').notNullable();
        table.time('to_time').notNullable();
        table.string('reason').notNullable();
        table.integer('time_type').defaultTo(1);
        table.boolean('isDeleted').defaultTo(0);
        table.boolean('isAccepted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);9
        table.integer('created_by').unsigned().notNullable();

        table.foreign('created_by').references('employees.id');

    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('undertime_overtime');

};
