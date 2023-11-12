import { routes } from "~/http/router/routes";
import { Server } from "~/http/server";
import { MockServerLogger } from "./mock-server-logger";


const logger = new MockServerLogger();
const server = new Server(routes(), logger)


export const app = server.invoke();