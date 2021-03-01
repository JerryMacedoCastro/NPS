import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    });

    const usersRepository = getCustomRepository(UsersRepository);

    try {
      await schema.validate(request.body, { abortEarly: false });

      const user = usersRepository.create({
        name,
        email,
      });

      const userAlreadyExists = await usersRepository.findOne({
        email,
      });
      if (userAlreadyExists) {
        return response.status(400).json({ Error: 'User already exists' });
      }

      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ Error: error });
    }
  }
}

export { UserController };
