import * as http from "http";
import { Config } from "./config";
import { MiddlewareConfig } from "./middleware/middleware.config";
import { ErrorHandler } from "./middleware/response_handler";

let server;

let middleware_manager = new MiddlewareConfig(Config.access_token_secret);
let app = middleware_manager.configure();

ErrorHandler.configure(app);

server = http.createServer(app);

server.listen(Config.port, () => {
  console.log("Listening on ", Config.port);
});
