import {getRepository} from "typeorm";
import { Attendence } from "../entities/models";
import { Request, Response, NextFunction } from "express";
import { IAttendenceController } from "./interfaces";
import HttpException from "../helpers/httpException";

export default class AttendenceController implements IAttendenceController {

  async create(req: Request, res: Response, next: NextFunction): Promise<any> {

    const { animal, animal_name, date, comment } = req.body;

    try {

      const AttendenceRepository = getRepository(Attendence);
      const dateFormatted = new Date(date);

      const newAttendence = new Attendence(animal, animal_name, dateFormatted, comment);

      AttendenceRepository.create(newAttendence);
      const attendence = await AttendenceRepository.save(newAttendence);

      if(!attendence) {
        throw new HttpException(500, "An error ocurred, value not inserted.");
      }

      return res.status(200).json( {attendence} );

    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<any> {

    const page = !!req.query.page ? req.query.page : "1";

    const LIMIT = 24;

    try {

      if(((!!page) && (Number.isNaN(+page)) || (+page<=0))) {
        throw new HttpException(500, "Invalid query param.");
      }

      const AttendenceRepository = getRepository(Attendence);

      const attendences = await AttendenceRepository.find({ skip: (+page-1)*LIMIT, take: LIMIT});

      if(!attendences) {
        throw new HttpException(404, "No recorded found for categories.");
      }

      return res.status(200).json( {attendences} );

    } catch (error) {
      next(new HttpException(error.status || 500, error.message));
    }
  }
}