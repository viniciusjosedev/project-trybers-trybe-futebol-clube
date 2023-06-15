// import { NextFunction, Request, Response } from 'express';
// import validations from './validations';

// const userBodyLoginValidate = async (req: Request, res: Response, next: NextFunction)
// : Promise<Response | void> => {
//   const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const { body } = req;

//   const { message } = validations.userBodyLoginValidate(body);

//   if (message?.includes('6')) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   if (message) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }

//   if (!validate.test(body.email)) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }

//   next();
// };

// export default {
//   userBodyLoginValidate,
// };
