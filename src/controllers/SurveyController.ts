import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { SurveysRepository } from '../repositories/SurveysRepository';
class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });
    await schema.validate(request.body, { abortEarly: false });

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);
    return response.status(201).json(survey);
  }

  async findAll(_request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return response.status(200).json(surveys);
  }
}

export { SurveyController };
