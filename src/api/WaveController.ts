import { Request, Response, Router } from "express";
import { decodeWave } from "../interfaces/Wave";
import { WaveService } from "../services/WaveService";
import { randomUUID } from 'crypto'
import { BAD_REQUEST_ERROR } from "../utils/Errors";
import { constants} from 'http2';

export const WaveController = (waveService: WaveService): Router => {
    const router = Router()

    router.get("/",async (req:Request,res:Response) => {
        const waves = await waveService.getWaves()
        res.status(constants.HTTP_STATUS_OK).send(waves)
    })

    router.get("/:id",async (req:Request,res:Response) => {
        const name = req.params.id as string
        const wave = await waveService.getWave(name)
        res.status(constants.HTTP_STATUS_OK).send(wave)
    })

    router.post("/",(req:Request,res:Response) => {
        try{
            const body = {...req.body, id: randomUUID() }
            const wave = decodeWave(body)
            waveService.createWave(wave)
            res.sendStatus(constants.HTTP_STATUS_CREATED)
        }catch(e){
            throw BAD_REQUEST_ERROR()
        }
    })

    return router
}