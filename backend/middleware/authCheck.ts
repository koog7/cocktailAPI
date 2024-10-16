import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/Users';

export interface RequestWithUser extends Request {
    user?: IUser;
}

const authCheck = async (req: RequestWithUser , res: Response , next: NextFunction) => {
    const getToken = req.get('Authorization');

    if(!getToken){
        return res.status(400).send({error:'Unauthorized'})
    }

    const [_Bearer , token] = getToken.split(' ')

    try{
        const user = await User.findOne({token: token}).lean<IUser>();

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        (req as RequestWithUser).user = user;
        next();
    }catch (e) {
        return res.status(400).send({ error: 'error' });
    }
}

export default authCheck;