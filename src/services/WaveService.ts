import { genWave, Wave } from "../interfaces/Wave";
import { Repo } from "../repos/Repo";

export class WaveService {

    constructor(public readonly repo: Repo){}

    async getWaves(){
        return this.repo.waves.getWaves()
    }

    createWave(wave:Wave){
        this.repo.waves.createWave(wave)
    }
}