import * as express from "express";
import { AccountController } from "../routes/account/account.route";

export class RouteConfig {
  static configure(app: express.Application) {
    app.use("/api/account", AccountController.routes());
    return app;
  }
}
