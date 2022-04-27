import { genRepoConfig, getRepoConfig } from "../config/RepoConfig"
import { Repo } from "../repos/Repo"
import { WaveService } from "../services/WaveService"
import { WaveController } from "./WaveController"
import {times} from "lodash"
import { genWave } from "../interfaces/Wave"
import { genNumber } from "../utils/Gen"
import express from "express"
import Request from 'supertest';
import { constants as httpConstants } from 'http2';
import { BAD_REQUEST_ERROR, errorMiddleWare } from "../utils/Errors"

jest.mock('../repos/Repo.ts')

describe('WaveController Tests',() => {
    describe('GET /',() => {
        it('should return a list of waves',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new WaveService(repo)
            const controller = WaveController(service)
            const waves = times(genNumber(1,10),()=> genWave())
    
            service.getWaves = jest.fn().mockReturnValue(waves)
    
            const app = express();
            app.use(express.json());
            app.use(controller);
    
            const response = await Request(app).get("/").expect(httpConstants.HTTP_STATUS_OK);
            expect(response.body).toEqual(waves)
        })
    })

    describe('POST /',() => {
        it('should create a new wave',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new WaveService(repo)
            const controller = WaveController(service)
            const wave = genWave()
    
            service.createWave = jest.fn().mockImplementation(() => wave)
    
            const app = express();
            app.use(express.json());
            app.use(controller);
    
            await Request(app).post("/").send(wave).expect(httpConstants.HTTP_STATUS_CREATED);
        })

        it('should return error when fields are missing',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new WaveService(repo)
            const controller = WaveController(service)
            const wave = genWave()
    
            service.createWave = jest.fn().mockImplementation(() => wave)
    
            const app = express();
            app.use(express.json());
            app.use(controller);
            app.use(errorMiddleWare)
    
            const response = await Request(app).post("/").send({}).expect(httpConstants.HTTP_STATUS_BAD_REQUEST);
            expect(response.body.message).toEqual(BAD_REQUEST_ERROR().message)
        })
    })

    describe('GET /:wave',() => {
        it('should return a wave with status 200',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new WaveService(repo)
            const controller = WaveController(service)
            const wave = genWave()
    
            service.getWave = jest.fn().mockReturnValue(wave)
    
            const app = express();
            app.use(express.json());
            app.use(controller);
    
            const response = await Request(app).get("/wave").expect(httpConstants.HTTP_STATUS_OK);
            expect(response.body).toEqual(wave)
        })
    })
})
