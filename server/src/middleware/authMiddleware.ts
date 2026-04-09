import { Request, Response, NextFunction } from 'express';

// auth middleware
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next(); 
  } else {
    res.status(401).send("Unauthorized: Please log in first.");
  }
};