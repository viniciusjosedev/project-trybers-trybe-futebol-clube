// import { NextFunction, Request, Response } from 'express';
// import validations from './validations';

// const matcheBodyUpdateInProgressValidate = async (req: Request, res: Response, next: NextFunction):
// Promise<Response | void> => {
//   const { body } = req;

//   const { message } = validations.matcheBodyUpdateInProgressValidate(body);

//   if (message) {
//     return res.status(400).json({ message });
//   }

//   next();
// };

// const matcheBodyUpdateValidate = async (req: Request, res: Response, next: NextFunction):
// Promise<Response | void> => {
//   const { body } = req;

//   const { message } = validations.matcheBodyUpdateValidate(body);

//   if (message) {
//     return res.status(400).json({ message });
//   }

//   next();
// };

// export default {
//   matcheBodyUpdateInProgressValidate,
//   matcheBodyUpdateValidate,
// };
