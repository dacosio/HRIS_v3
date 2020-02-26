exports.up = function (knex) {
    return knex.schema.createTable('end_of_day', (table) => {
        table.increments('id').primary();
        table.string('accomplishments').notNullable();
        table.string('impediments').notNullable();
        table.string('next_day_target').notNullable();
        table.string('concerns').notNullable();
        table.boolean('isDeleted').defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(null);
        table.integer('created_by').unsigned().notNullable();
        table.foreign('created_by').references('employees.id');

    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('end_of_day');
};