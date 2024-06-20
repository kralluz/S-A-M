/* import { NextFunction, Request, Response } from "express";
import AppError from "../Errors/error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleErrors = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }

  console.log(error);
  return res.status(500).json({ error: "Internal server error" });
};
 */