import "dotenv/config";

import "colors";
import express from "express";
import { StackLogger } from "./middlewares/stack.mw.js";
import { RequestLogger } from "./middlewares/request.mw.js";

const PORT = process.env.PORT || 8080;

class Core {
  app = express();
  router = express.Router();

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(RequestLogger);

    StackLogger(this.router);
  }

  static listen(port, host) {
    const _h = host || "localhost";
    const core = new Core();

    try {
      core.app.listen(port, _h, () => {
        console.log(
          `\nServer started `.magenta + `http://${_h}:${port}`.blue.underline
        );
      });
    } catch (err) {
      console.error(err);
    }
  }
}

Core.listen(PORT);
