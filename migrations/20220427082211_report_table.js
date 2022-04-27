/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return await knex.schema.raw(`      
    CREATE TABLE report (
    "uid"               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "id"                TEXT REFERENCES waves (id) NOT NULL,
    "swellSize"         FLOAT NOT NULL,
    "swellDirection"    TEXT NOT NULL,
    "tide"              FLOAT NOT NULL,
    "windStrength"      FLOAT NOT NULL,
    "windDirection"     TEXT NOT NULL,
    "rating"            INT NOT NULL
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.schema.raw(`
        DROP TABLE report;
  `)
};
