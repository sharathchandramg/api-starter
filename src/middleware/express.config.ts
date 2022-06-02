import * as express from "express";
import * as bodyParser from "body-parser";

import { expressjwt as jwt } from "express-jwt";
import logger from "../utils/logger";

const boom = require("express-boom");
const cors = require("cors");
const device = require("express-device");
const mung = require("express-mung");

export class ExpressConfig {
  public static configure(app: express.Application, secret_key: string) {
    const whiteList = ExpressConfig.getWhiteList(process.env.ENVIRONMENT);
    const corsOptions = {
      origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
          callback(null, true);
        } else if (origin == undefined) {
          callback(null, true); //https://github.com/expressjs/cors/issues/118
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

    if (process.env.ENVIRONMENT === "production") {
      app.use(cors(corsOptions));
    } else {
      logger.debug(`Enabling cors for all requests`);
      app.use(cors());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
      jwt({ secret: secret_key, algorithms: ["HS256"] }).unless({
        path: [
          new RegExp("/api/account/register", "i"),
          new RegExp("/api/account/login", "i"),
          new RegExp("/api/account/token", "i"),
        ],
      })
    );

    app.use(boom());
    app.use(
      device.capture({
        parseUserAgent: true,
      })
    );
    return app;
  }

  private static getWhiteList(environment) {
    //TODO:
    return ["*"];
  }
}

class AppResponse {
  private success: boolean;
  private data: any;
  private error: any;

  constructor(success: boolean, data: any, error: any) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
