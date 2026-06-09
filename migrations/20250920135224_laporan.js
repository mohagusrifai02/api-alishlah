/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.createTable('laporan', table=>{
    table.increments('id');
    table.string('judul');
    table.integer('infak');
    table.integer('kencleng');
    table.integer('kotakinfak');
    table.integer('zakat');
    table.integer('penerimaan');
    table.integer('pendidikan');
    table.integer('sosial');
    table.integer('dakwah');
    table.integer('operasional');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('laporan');
};
