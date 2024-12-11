import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export function validateSchema(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map((error) => ({
          path: error.path.join("."),
          message: error.message,
        }));
        res.status(400).send({ error: "Validation failed", details: errors });
      } else {
        next(err);
      }
    }
  };
}

