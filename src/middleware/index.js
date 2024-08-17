import cors from 'cors'
import { apiKeyValidator } from './apiKeyValidate.js'

const origin = JSON.parse(process.env.CORS_ORIGINS ?? '"*"')
export const corsMiddleware = cors({
  origin,
  optionsSuccessStatus: 200,
})

export const softStack = [apiKeyValidator]
