import {getRepository} from "typeorm";
import { User } from "../entities/models";
import { Request, Response, NextFunction } from "express";
import { IUserController } from "./interfaces";
import * as bcrypt from "bcryptjs";
import HttpException from "../helpers/httpException";
import secret from "../config/jwt";
import * as jwt from "jsonwebtoken";

export default class UserController implements IUserController {

  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {

    const { name, email, password } = req.body;

    try {

      const UserRepository = getRepository(User);

      const hashedPass = await bcrypt.hash(password,12);

      const newUser = new User(name, email, hashedPass);

      UserRepository.create(newUser);
      const user = await UserRepository.save(newUser);

      if(!user) {
        throw new HttpException(500, "An error ocurred, value not inserted.");
      }

      const token = jwt.sign({
        email: user.email,
      }, secret);

      return res.status(200).json( {
        message: "User sucefully connected.",
        token
      } );

    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {

    const { email, pass} = req.body;

    try {

      const UserRepository = getRepository(User);

      const user = await UserRepository.findOne({email});

      if(!user) {
        throw new HttpException(403, "User or password incorrect.");
      }

      const passValidation = await bcrypt.compare(pass, user.password);

      if (!passValidation) {
        throw new HttpException(403, "User or password incorrect.");
      }

      const token = jwt.sign({
        email: user.email,
      }, secret);

      return res.status(200).json( {token} );

    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}