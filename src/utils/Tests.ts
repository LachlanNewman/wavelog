import { getRepoConfig, RepoConfig } from "../config/RepoConfig";
import { Repo } from "../repos/Repo";
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


export const createDb = async (): Promise<Repo> => {
    const repoConfig = getRepoConfig(process.env);
    const dbName = genDbName();
    const pg = getConnection(repoConfig)
    await pg.raw(`CREATE DATABASE ${dbName}`);
    await pg.destroy()
    const repo = new Repo({ ...repoConfig, database: dbName });
    await repo.pg.migrate.latest({ tableName: 'migrations' });
    return repo
};

export const dropDb = async (repo: Repo): Promise<void> => {
  await repo.disconnect()
  const repoConfig = getRepoConfig(process.env);
  const pg = getConnection(repoConfig)
  await pg.raw(`DROP DATABASE IF EXISTS ${repo.config.database}`);
  await pg.destroy();
};

export const genDbName = (): string =>
    `db_${genAlphaNumeric()}`;

  