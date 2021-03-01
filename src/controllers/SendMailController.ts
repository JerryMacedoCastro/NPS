import { resolve } from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      return response.status(400).json({
        message: 'User does not exists',
      });
    }

    const surveyAlreadyExists = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!surveyAlreadyExists) {
      return response.status(400).json({
        message: 'Survey does not exists',
      });
    }
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [
        { user_id: userAlreadyExists.id, survey_id: surveyAlreadyExists.id },
      ],
      relations: ['user', 'survey'],
    });

    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(
        email,
        surveyAlreadyExists.title,
        variables,
        npsPath
      );

      return response.status(200).json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });
    variables.id = surveyUser.id;
    try {
      await surveysUsersRepository.save(surveyUser);

      await SendMailService.execute(
        email,
        surveyAlreadyExists.title,
        variables,
        npsPath
      );

      return response.status(201).json(surveyUser);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { SendMailController };
