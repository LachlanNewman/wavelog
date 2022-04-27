import express from "express";
import { WaveController } from "./api/WaveController";
import { WaveService } from "./services/WaveService";
import dotenv from "dotenv"
import {getRepoConfig } from "./config/RepoConfig";
import { Repo } from "./repos/Repo";
import cors from "cors";
import { errorMiddleWare } from "./utils/Errors";

dotenv.config()

const repoConfig = getRepoConfig(process.env)
const repo = new Repo(repoConfig)

const waveService = new WaveService(repo)

const waveController = WaveController(waveService)

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}))

app.use('/waves',waveController)

app.use(errorMiddleWare)

app.listen(4000,()=>console.log("listening"))