import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const userController = new UserController();
const surveyController = new SurveyController();
const router = Router();

router.post('/user', userController.create);
router.post('/survey', surveyController.create);
router.get('/survey', surveyController.findAll);

export { router };
