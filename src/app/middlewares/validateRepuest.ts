import { NextFunction, Request, Response } from "express";
import { AnyObject } from "mongoose";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest =
  (shcema: AnyObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await shcema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
