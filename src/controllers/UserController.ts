import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    const usersRepository = getCustomRepository(UsersRepository);

    await schema.validate(request.body, { abortEarly: false });

    const user = usersRepository.create({
      name,
      email,
    });

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });
    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
