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

describe('GET /waves',() => {
    it('should return a list of waves',async () => {
        const config = genRepoConfig();
        const repo = new Repo(config)
        const service = new WaveService(repo)
        const controller = WaveController(service)
        const waves = times(genNumber(),()=> genWave())

        service.getWaves = jest.fn().mockReturnValue(waves)

        const app = express();
        app.use(express.json());
        app.use(controller);

        const response = await Request(app).get("/waves").expect(httpConstants.HTTP_STATUS_OK);
        expect(response).toEqual(waves)

    })
})