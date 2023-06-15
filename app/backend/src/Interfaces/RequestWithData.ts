import { Request } from 'express';
import Data from './Data';

export default interface RequestWithData extends Request {
  data?: Data
}
