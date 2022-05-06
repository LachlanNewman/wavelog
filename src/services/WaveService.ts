import { Wave } from "../interfaces/Wave";
import { Repo } from "../repos/Repo";

export class WaveService {

    constructor(public readonly repo: Repo){}

    async getWave(id: string):Promise<Wave>{
        return this.repo.waves.getWave(id)
    }

    async getWaves(){
        return this.repo.waves.getWaves()
    }

    async createWave(wave:Wave){
        return await this.repo.waves.createWave(wave)
    }
}