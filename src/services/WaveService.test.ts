import { genRepoConfig } from "../config/RepoConfig"
import { genWave } from "../interfaces/Wave"
import { Repo } from "../repos/Repo"
import { WaveService } from "./WaveService"

jest.mock('knex')

describe('Wave Service Tests',() => {
    describe('.createWave()',() => {
        it('should create a new report',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new WaveService(repo)
            const wave = genWave()
            repo.waves.createWave = jest.fn().mockReturnValue(wave)
            const returned = await service.createWave(wave)
            expect(returned).toEqual(wave)
        })
    })
})