import { Request, Response, Router } from "express";
import { decodeWave } from "../interfaces/Wave";
import { WaveService } from "../services/WaveService";

export const WaveController = (waveService: WaveService): Router => {
    const router = Router()

    router.get("/",async (req:Request,res:Response) => {
        const waves = await waveService.getWaves()
        console.log(waves)
        res.statusCode = 200
        res.send(waves)
        return
    })

    router.post("/",(req:Request,res:Response) => {
        const wave = decodeWave(req.body)
        waveService.createWave(wave)
        res.sendStatus(201)
        return
    })

    return router
}