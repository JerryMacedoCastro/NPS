import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  constructor() {}

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { U } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(U),
    });

    if (!surveyUser) {
      throw new AppError('Survey user does not exist');
    }

    surveyUser.value = Number(value);
    await surveysUsersRepository.save(surveyUser);
    return response.status(201).json(surveyUser);
  }
}

export { AnswerController };
