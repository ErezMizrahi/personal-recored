import { Request, Response } from "express";
import { InternalUser } from "../models/internal-user.model";

export const test = async (req: Request, res: Response) => {
      const user  = await InternalUser.findOne({email: 'erezm@webtech-inv.co.il'});
    res.json({ 
        message: user
    });
    res.end();
}