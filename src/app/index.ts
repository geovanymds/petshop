import * as dotenv from "dotenv";
import express, {Express} from "express";
import cors from "../middlewares/cors";
import { MainRouter } from "../routes";
import errorHandler from "../middlewares/errorHandler";
import dbConnection from "../config/db/dbConnection";
import { IApp } from "./interfaces";
dotenv.config();

class App implements IApp {
  
  express: Express;

  constructor() {
    this.express = express();
    const connection = new dbConnection();
    connection.init(connection.dbConnect);
    this.middlewares();
    this.routes();
    this.express.use(errorHandler);
    this.express.listen(process.env.PORT || 8000);
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  }

  middlewares() {
    this.express.use(cors);
    this.express.use(express.json({ limit: "20mb" }));
    this.express.use(express.urlencoded({ extended: true, limit: "20mb" }));
  }

  routes() {
    new MainRouter(this.express);
  }
}

export default App;
