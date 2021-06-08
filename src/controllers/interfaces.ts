import { Request, Response, NextFunction } from "express";

export interface IUserController {
  login(req: Request, res: Response, next: NextFunction): Promise<any>;
  signup(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface IAttendenceController {
  create(req: Request, res: Response, next: NextFunction): Promise<any>;
  get(req: Request, res: Response, next: NextFunction): Promise<any>;
}
