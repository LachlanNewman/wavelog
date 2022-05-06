import { genReport, Report } from "../interfaces/Report"
import { Repo } from "../repos/Repo"

export class ReportService {

    constructor(public readonly repo: Repo){}

    public async createReport(report:Report):Promise<Report>{
        return await this.repo.reports.createReport(report)
    }
}