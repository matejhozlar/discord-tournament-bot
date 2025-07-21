import express from "express";
import cors from "cors";

// logger
import logger from "../logger/logger.js";

const app = express();

app.use(express.json());

app.use((error, req, res, next) => {
  logger.error(
    `Unhandled Express error at ${req.method} ${req.url}: ${logError(error)}`
  );
  res.status(500).json({ error: "Internal server error" });
});

// process.on("SIGINT", async () => {
//   logger.info("Gracefully shutting down...");
//   try {
//     await db.end();
//     io.close();
//     httpServer.close(() => {
//       logger.info("Server closed. Exiting...");
//       process.exit(0);
//     });
//   } catch (error) {
//     logger.error(`Error during shutdown: ${error}`);
//     process.exit(1);
//   }
// });

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled promise rejection: ${reason}`);
});

export default app;
