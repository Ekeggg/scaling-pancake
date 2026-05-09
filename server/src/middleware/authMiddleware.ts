import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send("Unauthorized: No token provided.");
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: number, userName: string };
    req.userId = decoded.userId;
    req.userName = decoded.userName;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token.");
  }
};
