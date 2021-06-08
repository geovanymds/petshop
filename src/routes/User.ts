import * as Express from "express";
import { Router } from "express";
import { UserController } from "../controllers";
import { IUserController } from "../controllers/interfaces";
import { IEntityRouter } from "./interfaces";

export default class UserRouter implements IEntityRouter {

  uri: string;
  router: Router;
  controller: IUserController;

  constructor() {
    this.uri = "/user";
    this.router = Express.Router();
    this.controller = new UserController();
    this.routes();
  }

  routes() {
    this.router.post("/signup", this.controller.signup);
    this.router.post("/login", this.controller.login);
  }

}
