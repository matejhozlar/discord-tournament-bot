// config
import dotenv from "dotenv";
dotenv.config();
import { validateEnv } from "./config/env/validateEnv.js";

import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app/app.js";
import logger from "./logger/logger.js";
import db, { connectToDatabase } from "./db/index.js";

// discord
import { initDiscordBot } from "./discord/index.js";

validateEnv();

const PORT = process.env.PORT;

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" },
});

await connectToDatabase();

await initDiscordBot(db, io);

httpServer.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  logger.info("Gracefully shutting down...");
  try {
    await db.end();
    io.close();
    httpServer.close(() => {
      logger.info("Server closed. Exiting...");
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Error during shutdown: ${error}`);
    process.exit(1);
  }
});
