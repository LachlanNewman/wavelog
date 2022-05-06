import { Report } from "../interfaces/Report"
import { Repo } from "./Repo"

export class ReportRepo{

    constructor(private readonly repo: Repo) {}

    createReport(report:Report): Promise<Report> {
        return this.repo.runTransaction(async transaction => 
            transaction<Report>('reports').insert(report)
        )
    }
}