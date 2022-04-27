import { Request, Response, Router } from "express";
import { decodeWave } from "../interfaces/Wave";
import { WaveService } from "../services/WaveService";
import { randomUUID } from 'crypto'

export const WaveController = (waveService: WaveService): Router => {
    const router = Router()

    router.get("/",async (req:Request,res:Response) => {
        const waves = await waveService.getWaves()
        res.statusCode = 200
        res.send(waves)
        return
    })

    router.get("/:id",async (req:Request,res:Response) => {
        const name = req.params.id as string
        const wave = await waveService.getWave(name)
        res.statusCode = 200
        res.send(wave)
        return
    })

    router.post("/",(req:Request,res:Response) => {
        const body = {...req.body, id: randomUUID() }
        const wave = decodeWave(body)
        waveService.createWave(wave)
        res.sendStatus(201)
        return
    })

    return router
}