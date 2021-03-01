import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  constructor() {}

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { U } = request.query;

    try {
      const surveysUsersRepository = getCustomRepository(
        SurveysUsersRepository
      );

      const surveyUser = await surveysUsersRepository.findOne({
        id: String(U),
      });

      if (!surveyUser) {
        return response
          .status(400)
          .json({ message: 'Survey user does not exist' });
      }

      surveyUser.value = Number(value);
      await surveysUsersRepository.save(surveyUser);
      return response.status(201).json(surveyUser);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { AnswerController };
