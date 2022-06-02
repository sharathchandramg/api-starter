import * as express from "express";
import logger from "../utils/logger";
const mung = require("express-mung");

export class ResponseHandler {
  public static configure(app: express.Application) {
    app.use(
      mung.json((body: any, req: express.Request, res: express.Response) => {
        const formattedResponse = new AppResponse(true, body, "");
        return formattedResponse;
      })
    );
    return app;
  }
}

export class ErrorHandler {
  public static configure(app: express.Application) {
    app.use((err, req, res, next) => {
      logger.error("Inside the error handler");
      logger.error(err);
      if (err.isBoom) {
        const error =
          err.output.payload && err.output.payload.message
            ? err.output.payload.message
            : "Something went wrong.";
        const formattedResponse = new AppResponse(false, null, error);

        return res.status(err.output.statusCode).json(formattedResponse);
      } else {
        if (err.code === "permission_denied") {
          const formattedResponse = new AppResponse(
            false,
            null,
            "Insufficient Permissions."
          );
          return res.status(401).send(formattedResponse);
        } else {
          const formattedResponse = new AppResponse(false, null, err.message);
          return res.status(err.status || 500).send(formattedResponse);
        }
      }
    });
    return app;
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
