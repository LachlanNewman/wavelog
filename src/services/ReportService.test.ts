import express from "express"
import { genRepoConfig } from "../config/RepoConfig"
import { genReport, Report } from "../interfaces/Report"
import { Repo } from "../repos/Repo"
import { ReportRepo } from "../repos/ReportRepo"
import { ReportService } from "./ReportService"

jest.mock('knex')

describe('Report Service Tests',() => {
    describe('.createReport()',() => {
        it('should create a new report',async () => {
            const config = genRepoConfig()
            const repo = new Repo(config)
            const service = new ReportService(repo)
            const report = genReport()
            repo.reports.createReport = jest.fn().mockReturnValue(report)
            const returned = await service.createReport(report)
            expect(returned).toEqual(report)
        })
    })
})