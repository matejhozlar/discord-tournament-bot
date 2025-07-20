import app from "./app/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log("Server started on http://127.0.0.1:5000");
});
