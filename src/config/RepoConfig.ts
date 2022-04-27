import { genAlphaNumeric, genNumber } from "../utils/Gen"

export interface RepoConfig{
    database: string,
    port: number,
    host: string,
    user: string,
    password: string,
}

export const getRepoConfig = (env: NodeJS.ProcessEnv):RepoConfig => ({
    database: env.DATABASE ?? 'wavelog',
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
    host: env.DB_HOST ?? 'localhost',
    user: env.DB_USER ?? 'postgres',
    password: env.DB_PASSWORD ?? 'example',
})

export const genRepoConfig = ():RepoConfig => ({
    database: genAlphaNumeric(),
    port: genNumber(0,65536),
    host: genAlphaNumeric(),
    user: genAlphaNumeric(),
    password: genAlphaNumeric(),
})