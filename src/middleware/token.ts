import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export async function TokenCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers["token"] as string;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is required",
      });
      return;
    }

    if (token === SECRET_TOKEN) {
      return next(); // Proceed to the next middleware
    } else {
      res.status(403).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

