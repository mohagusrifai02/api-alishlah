/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users',table=>{
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password').unique().notNullable();
    table.timestamp(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('users');
};
