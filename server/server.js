import app from "./app/app.js";
import dotenv from "dotenv";

// config
import { validateEnv } from "./config/env/validateEnv.js";

// discord
import { loadCommands } from "./discord/loader/commandLoader.js";

// logger
import logger from "./logger/logger.js";

dotenv.config();

validateEnv();

const commandHanders = await loadCommands();

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  logger.info(`Server started on http://127.0.0.1:${PORT}`);
});
