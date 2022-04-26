/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return await knex.schema.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
    CREATE TABLE waves (
    "id"                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name"              TEXT UNIQUE NOT NULL,
    "longitude"         FLOAT NOT NULL,
    "lattitude"        FLOAT NOT NULL
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.schema.raw(`
      DROP TABLE waves;
    `)
};
