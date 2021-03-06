import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const schema = yup.object().shape({
      survey_id: yup.string().required(),
    });
    await schema.validate(request.params);

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    if (surveysUsers.length === 0)
      throw new AppError(`No aswers for this survey: ${survey_id}`);

    const defractores = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 0 && surveyUser.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10
    ).length;

    const passives = surveysUsers.filter(
      (surveyUser) => surveyUser.value >= 7 && surveyUser.value <= 8
    ).length;

    const totalAnswers = Object.keys(surveysUsers).length;

    const calculus = Number(
      (((promoters - defractores) / totalAnswers) * 100).toFixed(2)
    );

    return response.status(200).json({
      defractores,
      promoters,
      passives,
      totalAnswers,
      nps: calculus,
    });
  }
}

export { NpsController };
