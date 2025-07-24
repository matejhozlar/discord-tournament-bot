import fs from "fs";
import path from "path";
import glob from "fast-glob";
import logger from "../logger/logger.js";

const SOURCE_DIR = path.resolve(".");

function findEnvVarsInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = content.matchAll(/process\.env\.([A-Z0-9_]+)/g);
  return Array.from(matches, (m) => m[1]);
}

export function generateRequiredEnvVars(outputPath) {
  const allFiles = glob.sync(["**/*.js"], {
    cwd: SOURCE_DIR,
    ignore: ["node_modules/**", "client/**", "build/**", "dist/**"],
    absolute: true,
  });

  const envVars = new Set();

  for (const file of allFiles) {
    try {
      const vars = findEnvVarsInFile(file);
      vars.forEach((v) => envVars.add(v));
    } catch (err) {
      logger.warn(`Skipping unreadable file ${file}: ${err.message}`);
    }
  }

  const sortedVars = Array.from(envVars).sort();

  const jsContent = `const REQUIRED_VARS = [\n${sortedVars
    .map((v) => `  "${v}",`)
    .join("\n")}\n];\n\nexport default REQUIRED_VARS;\n`;

  fs.writeFileSync(outputPath, jsContent);
  logger.info(`Wrote ${sortedVars.length} required env vars to ${outputPath}`);
  process.exit(1);
}
