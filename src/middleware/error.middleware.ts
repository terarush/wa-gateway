import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`Error occurred: ${message}`, err);

  res.status(statusCode).send({
    error: message,
    ...(process.env.NODE_ENV === "development" && { details: err.stack }),
  });
}

