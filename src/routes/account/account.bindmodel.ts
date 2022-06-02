import * as Joi from "joi";

export class AccountBindingSchema {
  public static login = Joi.object({
    username: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  });

  public static token = Joi.object({
    grant_type: Joi.string().required(),
    refresh_token: Joi.string().required(),
    workspace_id: Joi.string().required(),
  });
}
