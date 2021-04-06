import { Response, Request, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";


export const ensureAuthenticated = async (request: Request, _response: Response, next: NextFunction): Promise<void> => {
  const { authorization } = request.headers

  if (!authorization) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const { sub: user_id } = verify(token, '13df1a8dc2d003d4583f327fe1ad48c4') as { sub: string }

    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not exists', 401)
    }

    request.user = { id: user_id }

    next()

  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
