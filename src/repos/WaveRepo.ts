import knex from "knex";
import { Wave } from "../interfaces/Wave";
import { Repo } from "./Repo";

export class WaveRepo{

    constructor(private readonly repo: Repo) {}

    async getWaves(): Promise<Wave[]> {
        return this.repo.runTransaction(async transaction => 
            transaction<Wave>('waves').select()
        )
    }

    createWave(wave:Wave): Promise<Wave> {
        return this.repo.runTransaction(async transaction => 
            transaction<Wave>('waves').insert(wave)
        )
    }
}