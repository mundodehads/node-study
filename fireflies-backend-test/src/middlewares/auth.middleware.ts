import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../models/auth.js";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.header("x-user-id");

  if (!userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  req.userId = userId;
  next();
};
