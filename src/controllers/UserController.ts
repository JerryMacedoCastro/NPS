import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../Models/User';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const usersRepository = getRepository(User);

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

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { UserController };
