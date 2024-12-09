import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) throw new Error("No token provided");
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = payload;

    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    try {
      if (!roles.includes(req.user.role))
        throw new Error("You do not have permission to access this resource");

      next();
    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  };
};
