import * as Express from "express";
import { Router } from "express";
import { AttendenceController } from "../controllers";
import { IAttendenceController } from "../controllers/interfaces";
import { IEntityRouter } from "./interfaces";

export default class AttendenceRouter implements IEntityRouter {

  uri: string;
  router: Router;
  controller: IAttendenceController;

  constructor() {
    this.uri = "/attendence";
    this.router = Express.Router();
    this.controller = new AttendenceController();
    this.routes();
  }

  routes() {
    this.router.post("/register", this.controller.create);
    this.router.get("/", this.controller.get);
  }

}