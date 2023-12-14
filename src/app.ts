import { Server } from "~/http/server";
import { ServerLogger } from "./http/logger";
import { routes } from "./http/router/routes";

const logger = new ServerLogger();
const server = new Server(routes(), logger);

server.start();
