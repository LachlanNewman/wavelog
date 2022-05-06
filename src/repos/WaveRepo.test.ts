import { createDb,dropDb } from "../utils/Tests"
import { genWave, Wave } from "../interfaces/Wave"
import {times, omit} from 'lodash'
import { genNumber } from "../utils/Gen"

describe('WaveRepo Tests',() => {
    describe('.getWave()',() => {
        it('should return an existing wave',async () => {
            const repo = await createDb()
            const wave = genWave()
            await repo.runTransaction(async transaction => transaction<Wave>('waves').insert(wave))
            const retrieved = await repo.waves.getWave(wave.id)
            expect(retrieved.id).toBe(wave.id)
            expect(retrieved.name).toBe(retrieved.name)
            expect(retrieved.lattitude).toBe(retrieved.lattitude)
            expect(retrieved.longitude).toBe(retrieved.longitude)
            await dropDb(repo)
        })
    })

    describe('.getWaves()',() => {
        it('should return all existing waves',async () => {
            const repo = await createDb()
            const waves = times(genNumber(2,10), () => genWave()) as Wave[]
            
            for(const wave of waves){
                await repo.runTransaction(async transaction => transaction<Wave>('waves').insert(wave))
            }
            const retrieved = await repo.waves.getWaves()

            for(const wave of retrieved){
                expect(waves).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({...omit(wave,'uid')})
                    ])
                )
            }

            await dropDb(repo)
        })
    })

    describe('.createWave()',() => {
        it('should create a wave',async () => {
            const repo = await createDb()
            const wave = genWave()
            repo.waves.createWave(wave)
            const retrieved = await repo.runTransaction(async transaction => transaction<Wave>('waves').where({id:wave.id}).then(r => r[0]))
            expect(retrieved.id).toBe(wave.id)
            expect(retrieved.name).toBe(retrieved.name)
            expect(retrieved.lattitude).toBe(retrieved.lattitude)
            expect(retrieved.longitude).toBe(retrieved.longitude)
            await dropDb(repo)
        })
    })
})