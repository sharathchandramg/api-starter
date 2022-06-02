import * as express from "express";
import logger from "../utils/logger";
const expressWinston = require("express-winston");

export class ExpressLogConfig {
  public static configure(app: express.Application) {
    app.use(
      expressWinston.logger({
        winstonInstance: logger,
      })
    );
  }
}
