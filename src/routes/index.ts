import UserRouter from "./User";
import AttendenceRouter from "./Attendence";
import { Express } from "express";
import { IEntityRouter, IMainRouter } from "./interfaces";

export class MainRouter implements IMainRouter {
  
  routers: IEntityRouter[];

  constructor(express: Express) {
    this.routers = [];
    this.routers.push(new UserRouter());
    this.routers.push(new AttendenceRouter());
    this.routers.forEach((router)=>{
      express.use(router.uri,router.router);
    });
  }

}
