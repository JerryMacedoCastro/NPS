import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.create({
      name,
      email,
    });

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });
    if (userAlreadyExists)
      response.status(200).json({ message: 'User already exists' });

    try {
      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { UserController };
