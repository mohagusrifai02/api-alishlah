/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('blogs', table=>{
    table.increments('id');
    table.string('judul').notNullable();
    table.string('kategori').notNullable();
    table.string('paragraf').notNullable();
    table.string('gambar', 255).notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('blogs');
};
