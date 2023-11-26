import { routes } from "~/http/router/routes.ts";
import { Server } from "~/http/server.ts";
import { MockServerLogger } from "./mock-server-logger.ts";

const logger = new MockServerLogger();
const server = new Server(routes(), logger);

export const app = server.invoke();
