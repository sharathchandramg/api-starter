import * as express from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import { AccountBindingSchema } from "./account.bindmodel";
import * as passport from "passport";
import logger from "../../utils/logger";
import { convert_usecase_error_to_http_error } from "../../utils/usecase_error_coverter";
const validator = require("express-joi-validation").createValidator({});

export class AccountController {
  public static routes = () => {
    let router = express.Router();

    router.post(
      "/login",
      validator.body(AccountBindingSchema.login),
      asyncMiddleware(async (req, res, next) => {
        return res.status(200).send({});
      })
    );

    router.post(
      "/token",
      validator.body(AccountBindingSchema.token),
      asyncMiddleware(async (req, res, next) => {
        return res.status(200).send({});
      })
    );

    return router;
  };
}
