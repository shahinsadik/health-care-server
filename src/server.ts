import { log } from "console";

import app from "./app";
import { Server } from "http";
import config from "./config";

const port = config.port;

async function main() {
  const server: Server = app.listen(port, () => {
    log(`Health Care Server is running on port ${port}`);
  });

  const existHandler = () => {
    if (server) {
      server.close(() => {
        log("Server closed gracefully");
      });
    }
    process.exit(0);
  };
  process.on("uncaughtException", (err) => {
    log("Uncaught Exception:", err);
    existHandler();
  });
  process.on("unhandledRejection", (err) => {
    log("Uncaught Exception:", err);
    existHandler();
  });
}
main();
