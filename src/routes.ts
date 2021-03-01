import { Router } from 'express';
import { AnswerController } from './controllers/AnswersController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();

const router = Router();

router.post('/user', userController.create);

router.post('/survey', surveyController.create);
router.get('/survey', surveyController.findAll);

router.post('/sendmail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

export { router };
