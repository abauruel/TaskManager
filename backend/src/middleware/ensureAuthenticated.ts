import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../shared/errors/appError";

interface IPayload {
  sub: String
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError("token is missing")
  }

  const [, token] = authHeader.split(" ")
  const mySecret = process.env.SECRET
  if (!mySecret) {
    throw new AppError("Internal server error", 500)
  }

  try {
    const { sub: idUser } = verify(token, mySecret) as IPayload
    const userRepository = new UsersRepository()
    const user = await userRepository.findById(Number(idUser))
    if (!user) {
      throw new AppError("user does not exists")
    }

    request.idUser = user.id
    next()

  } catch (error) {
    throw new AppError("invalid token", 401)
  }
}