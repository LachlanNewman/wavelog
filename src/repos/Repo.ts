import knex, { Knex } from "knex";
import { RepoConfig } from "../config/RepoConfig";
import { ReportRepo } from "./ReportRepo";
import { WaveRepo } from "./WaveRepo";
import { ClientConfig } from 'pg'

export class Repo{
    public waves: WaveRepo;
    public reports: ReportRepo;

    readonly config: RepoConfig;
    readonly pg: Knex;

    constructor(config: RepoConfig) {
        this.config = config
        try {
          this.pg = knex({
            client: 'postgresql',
            connection: {
              connectionString: process.env.DATABASE_URL,
              ssl: {
                rejectUnauthorized: false
              }
            }
          });
    
          this.waves = new WaveRepo(this);
          this.reports = new ReportRepo(this);

        } catch (err) {
          throw new Error(err.message);
        }
      }

      disconnect = (): Promise<void> => this.pg.destroy();

      private async runTransactionWithRollbackOnError<A>(func: (trx: Knex.Transaction) => Promise<A>): Promise<A>{
        return this.pg.transaction(async (trx: Knex.Transaction) => {
            try {
            return await func(trx);
            } catch (err) {
            await trx.rollback(err);
            throw err
            }
        });
      }
    
      runTransaction<T>(func: (trx: Knex.Transaction) => Promise<T>, trx?: Knex.Transaction): Promise<T>{
        return trx ? func(trx) : this.runTransactionWithRollbackOnError(func);
      }
}