import 'dotenv/config'

export type Config = {
    apiPort: number
    host: string
    dbPort: number
    user: string
    database: string
    password: string
    secret: string
    rounds: string
    clientId: string
    clientSecret: string
}

const getEnv = (key: string) => {
    if (!process.env[key]) throw Error(`Err: no env variable for ${key}`)
    return process.env[key]
}

export const config: Config = {
    apiPort: Number(getEnv('API_PORT')),
    host: getEnv('DB_HOST'),
    dbPort: Number(getEnv('DB_PORT')),
    user: getEnv('DB_USER'),
    database: getEnv('DB_NAME'),
    password: getEnv('DB_PASSWORD'),
    secret: getEnv('SECRET'),
    rounds: getEnv('SALT_ROUNDS'),
    clientId: getEnv('CLIENT_ID'),
    clientSecret: getEnv('CLIENT_SECRET'),
}
