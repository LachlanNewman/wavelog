import express from "express";
import { WaveController } from "./api/WaveController";
import { WaveService } from "./services/WaveService";
import dotenv from "dotenv"
import {getRepoConfig } from "./config/RepoConfig";
import { Repo } from "./repos/Repo";
import { convertToObject } from "typescript";

dotenv.config()

const repoConfig = getRepoConfig(process.env)
const repo = new Repo(repoConfig)

const waveService = new WaveService(repo)

const waveController = WaveController(waveService)

const app = express();
app.use(express.json());

app.use('/waves',waveController)

app.listen(4000,()=>console.log("listening"))