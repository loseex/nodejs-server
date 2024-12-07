import User from "./user.schema.js";
import crypto from "crypto";

export class UserService {
  /**
   * Метод для получения списка пользователей.
   * @returns Список пользователей
   */
  async find() {
    return await User.find();
  }

  /**
   * Метод для получения пользователя по id.
   * @param { string } id
   */
  async findById(id) {
    return await User.findById(id);
  }

  /**
   * Метод для создания пользователя.
   * @param { User } payload
   */
  async create(payload) {
    const current = await User.create({ ...payload });
    const hash = crypto
      .createHash("md5")
      .update(current._id.toString())
      .digest("hex")
      .toString();
    return hash;
  }

  /**
   * Метод для изменения пользователя.
   * @param { string } id
   * @param {{ name: string }} payload
   */
  async update(id, payload) {
    const current = await User.findByIdAndUpdate(id, { ...payload });
    return current;
  }
}
