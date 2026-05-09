import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
      if (err) {
        return res.status(401).send("Unauthorized: Invalid token.");
      }

      req.userId = decoded.userId;
      req.userName = decoded.userName;
      next();
    });
  } else {
    res.status(401).send("Unauthorized: No token provided.");
  }
};
