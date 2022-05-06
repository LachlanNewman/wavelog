import { getRepoConfig, RepoConfig } from "../config/RepoConfig";
import { Repo } from "../repos/Repo";
import crypto from 'crypto';
import { genAlphaNumeric } from "./Gen";
import knex, {Knex} from "knex";

export const getConnection = (config: RepoConfig, options?: Knex.Config): Knex =>
  knex({
    client: 'pg',
    connection: {
      database: config.database,
      host: config.host,
      user: config.user,
      password: config.password,
    },
    pool: {
      min: 1,
      max: 1,
    },
    ...options,
  });


export const createDb = async (config: RepoConfig, dbName: string): Promise<void> => {
    const pg = getConnection(config);
    try {
      await pg.raw(`CREATE DATABASE ${dbName}}`);
    } catch (err) {
      console.log(err)
    } finally {
      await pg.destroy();
    }
  };

export const dropDb = async (config: RepoConfig, dbName: string): Promise<void> => {
const pg = getConnection(config);
try {
    await pg.raw(`DROP DATABASE IF EXISTS ${dbName}`);
} catch (err) {
    console.log(err)
} finally {
    await pg.destroy();
}
};

export const genDbName = (): string =>
    `db_${genAlphaNumeric()}`;

export const withRepo = async (f: (repo: Repo) => Promise<void>): Promise<void> => {
    const repoConfig = getRepoConfig(process.env);
    const dbName = genDbName();
    const repo = new Repo({ ...repoConfig, database: dbName });
    try {
      await createDb(repoConfig, dbName);
      await f(repo);
    } finally {
      await dropDb(repoConfig, dbName);
    }
  };
  