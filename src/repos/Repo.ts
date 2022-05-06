import knex, { Knex } from "knex";
import { RepoConfig } from "../config/RepoConfig";
import { ReportRepo } from "./ReportRepo";
import { WaveRepo } from "./WaveRepo";

export class Repo{
    public waves: WaveRepo;
    public reports: ReportRepo;

    private readonly pg: Knex;

    constructor(config: RepoConfig) {
        try {
          this.pg = knex({
            client: 'pg',
            connection: {
              database: config.database,
              port: config.port,
              host: config.host,
              user: config.user,
              password: config.password,
            }
          });
    
          this.waves = new WaveRepo(this);
          this.reports = new ReportRepo(this);

        } catch (err) {
          throw new Error(err.message);
        }
      }

      private connect(config: RepoConfig){
        
      }

      private async runTransactionWithRollback<A>(func: (trx: Knex.Transaction) => Promise<A>): Promise<A>{
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
        return trx ? func(trx) : this.runTransactionWithRollback(func);
      }
}