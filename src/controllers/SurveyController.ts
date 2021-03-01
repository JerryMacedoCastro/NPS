import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });
    try {
      await surveysRepository.save(survey);
      return response.status(201).json(survey);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findAll(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    try {
      const surveys = await surveysRepository.find();

      return response.status(200).json(surveys);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { SurveyController };
