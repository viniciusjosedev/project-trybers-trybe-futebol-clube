import { Router } from 'express';
import userController from '../controllers/userController';
import userValidate from '../middlewares/userValidate';

const userRoute = Router();

userRoute.post(
  '/login',
  userValidate.userBodyLoginValidate,
  userController.login,
);

export default userRoute;
