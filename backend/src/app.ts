import 'reflect-metadata'
import 'dotenv/config'
import './shared/container'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { routes } from './shared/http/routes'
import { AppError } from './shared/errors/appError'


const app = express()

app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `internal server error - ${err.message}`
  })
})

export { app }