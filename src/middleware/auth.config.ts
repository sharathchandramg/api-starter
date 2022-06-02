import * as passport from "passport";
import * as passportLocal from "passport-local";
// import { hash_password, verify_password } from "../app/usecase/account/manage_auth";
// import { User } from "../model/user/user_document_schema";

export class AuthConfig {
  public static configure = () => {
    let Strategy = passportLocal.Strategy;
    const strategy = new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        // const user_doc = await User.findOne({ username: username });
        // if (user_doc == null) return done(new Error("user not found"), null);

        // const password_match = await verify_password(password, user_doc.password_hash);
        // if (password_match == false) return done(new Error("Invalid password"), null);

        return done(null, { user_id: 1 });
      }
    );

    passport.use(strategy);
  };
}
