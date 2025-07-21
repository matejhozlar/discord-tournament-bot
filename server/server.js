import app from "./app/app.js";
import dotenv from "dotenv";

// logger
import logger from "./logger/logger.js";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  logger.info(`Server started on http://127.0.0.1:${PORT}`);
});
