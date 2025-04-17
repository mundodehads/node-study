import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const detailedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      res.status(400).json({
        message: "Validation failed",
        errors: detailedErrors,
      });
      return;
    }

    next();
  };
};
