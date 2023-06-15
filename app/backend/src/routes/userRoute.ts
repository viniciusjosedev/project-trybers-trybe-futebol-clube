import { Router } from 'express';
import userController from '../controllers/userController';
import userValidate from '../middlewares/userValidate';
import isAuth from '../auth/isAuth';

const userRoute = Router();

userRoute.post(
  '/login',
  userValidate.userBodyLoginValidate,
  userController.login,
);

userRoute.get('/login/role', isAuth, userController.getRole);

export default userRoute;
