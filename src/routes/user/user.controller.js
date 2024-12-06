import { UserService } from "./user.service.js";

export class UserController {
  constructor(app) {
    this.userService = new UserService();

    const _this = this;

    app.get("/users", this.findAll.bind(_this));
    app.get("/users/:id", this.findById.bind(_this));
    app.post("/users/create", this.create.bind(_this));
    app.put("/users/update/:id", this.update.bind(_this));
  }

  async findAll(_, res) {
    try {
      const current = await this.userService.find();
      res.status(200).json(current);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async findById(req, res) {
    try {
      const current = await this.userService.findById(req.params.id);
      res.status(200).json(current);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const current = await this.userService.update(id, {
        name,
      });
      res.status(200).json(current);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  async create(req, res) {
    try {
      const id = await this.userService.create(req.body);
      res.status(200).json({ id });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
