import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/Users';

export interface RequestWithUser extends Request {
  user?: IUser;
}

const permit = (...roles: string[]) =>{
  return (req: RequestWithUser , res: Response , next: NextFunction) => {
    const user = (req as RequestWithUser).user

    if(!user || !roles.includes(user.role)){
      return res.status(403).send({error:'You are not admin'})
    }
    return next()
  }
}

export default permit;