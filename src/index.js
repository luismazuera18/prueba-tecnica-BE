import express from 'express'
import { corsMiddleware } from './middleware/index.js'
import animalsRouter from './routes/animals/index.js'
import logger from './utils/logger.js'

const app = express()

// Set up cors
app.use(corsMiddleware)

// Preflight
app.options('*', corsMiddleware)

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(
  express.urlencoded({
    extended: false,
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(
  express.raw({
    extended: false,
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)

//Routes
app.use('/searchAnimals', animalsRouter)

// healthCheck for AWS ELB
app.get('/healthCheck', function (req, res) {
  res.status(200).json({
    success: true,
    message: 'Service Running',
  })
})

app.options('*', corsMiddleware)

app.listen(process.env.PORT || 80, () => {
  logger.info(` Listening Port: ${process.env.PORT}`)
})
