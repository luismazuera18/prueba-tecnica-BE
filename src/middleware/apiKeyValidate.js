import { isEmpty } from '../utils/index.js'
import logger from '../utils/logger.js'

export const apiKeyValidator = (req, res, next) => {
  const fName = '[apiKeyValidator]'

  logger.info(`${fName} Validating API Key...`)

  // Obtener la API key del encabezado de la solicitud
  const apiKey = req.headers['x-api-key']
  console.log('🚀 ~ apiKeyValidator ~ apiKey:', apiKey)

  // Validar si la API key está presente
  if (isEmpty(apiKey)) {
    return res.status(404).json({ error: 'API key is missing' })
  }

  // Aquí podrías agregar lógica adicional para validar si la API key es correcta
  const validApiKey = process.env.API_KEY // Supongamos que tienes la API key en tus variables de entorno

  if (apiKey !== validApiKey) {
    return res.status(404).json({ error: 'Invalid API key' })
  }

  // Si la API key es válida, continúa al siguiente middleware
  next()
}
