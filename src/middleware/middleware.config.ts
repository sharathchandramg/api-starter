import * as express from "express";
import logger from "../utils/logger";
import { AuthConfig } from "./auth.config";
import { ExpressConfig } from "./express.config";
import { ExpressLogConfig } from "./express.log.config";
import { ErrorHandler, ResponseHandler } from "./response_handler";
import { RouteConfig } from "./route.config";

export class MiddlewareConfig {
  private app: express.Application;
  private _publickey: string;

  constructor(publickey: string) {
    this._publickey = publickey;
    this.app = express();
  }

  public configure(): express.Application {
    // ErrorHandler.configure(this.app);
    ExpressLogConfig.configure(this.app);
    AuthConfig.configure();
    ExpressConfig.configure(this.app, this._publickey);
    ResponseHandler.configure(this.app);
    RouteConfig.configure(this.app);

    return this.app;
  }
}
