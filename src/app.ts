import express from "express";
import { Server } from "~/http/server"
import { ServerLogger } from "./http/logger";


const router = express.Router();
const logger = new ServerLogger();
const server = new Server(router, logger);

server.start();