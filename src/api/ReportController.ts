import { Request, Response, Router } from "express"
import { constants } from "http2"
import { decodeReport } from "../interfaces/Report"
import { ReportService } from "../services/ReportService"
import { BAD_REQUEST_ERROR } from "../utils/Errors"

export const ReportController = (service: ReportService): Router => {
    const router = Router()

    router.post("/",(req:Request,res:Response) => {
        try{
            const report = decodeReport(req.body)
            service.createReport(report)
            res.status(constants.HTTP_STATUS_CREATED).send(report)
        }catch(e){
            throw BAD_REQUEST_ERROR()
        }
    })

    return router
}