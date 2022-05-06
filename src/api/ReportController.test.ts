import express from "express"
import Request from 'supertest';
import { genRepoConfig } from "../config/RepoConfig"
import { genReport } from "../interfaces/Report"
import { Repo } from "../repos/Repo"
import { ReportService } from "../services/ReportService"
import { ReportController } from "./ReportController"
import {omit} from "lodash"
import { constants } from "http2";
import { BAD_REQUEST_ERROR, errorMiddleWare } from "../utils/Errors";

jest.mock('../repos/Repo.ts')

describe('POST /',() => {
    it('should create a new report',async () => {
        const config = genRepoConfig()
        const repo = new Repo(config)
        const service = new ReportService(repo)
        const controller = ReportController(service)
        const report = genReport()
        service.createReport = jest.fn().mockImplementation(() => report)

        const app = express();
        app.use(express.json());
        app.use(controller);

        const {body} = await Request(app).post(`/`).send(report).expect(constants.HTTP_STATUS_CREATED);
        expect(body).toEqual(report)
    })

    it('should return error when fields are missing',async () => {
        const config = genRepoConfig()
        const repo = new Repo(config)
        const service = new ReportService(repo)
        const controller = ReportController(service)

        const app = express();
        app.use(express.json());
        app.use(controller);
        app.use(errorMiddleWare)

        const response = await Request(app).post("/").send({}).expect(constants.HTTP_STATUS_BAD_REQUEST);
        expect(response.body.message).toEqual(BAD_REQUEST_ERROR().message)
    })
})