import "dotenv/config";

import "colors";
import express from "express";
import { StackLogger } from "./middlewares/stack.mw.js";
import { RequestLogger } from "./middlewares/request.mw.js";
import Database from "./database/index.js";
import { UserController } from "./routes/user/user.controller.js";

const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

class Core {
  app = express();
  router = express.Router();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(RequestLogger);

    new UserController(this.app);

    StackLogger(this.router);
  }

  /**
   * Метод для запуска сервера на указанном порту и хосте.
   * @param { string | number } port
   * @param { string } host
   */
  listen(port, host) {
    const _h = host || "localhost";
    this.app.listen(+port, _h, () => {
      console.log(
        `\nServer started `.magenta + `http://${_h}:${port}`.blue.underline
      );
    });
  }

  /**
   * Статический метод для запуска приложения и подключения к базе данных
   * @param { string | number } port
   * @param { string } host
   */
  static start(port, host) {
    const core = new Core();
    try {
      Database.connect(MONGOURL, () => {
        core.listen(port, host);
      });
    } catch (err) {
      console.error(new Error("Runtime Error:: " + e));
    }
  }
}

Core.start(PORT);
