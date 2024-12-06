import mongoose from "mongoose";

class Database {
  /**
   * Метод для подключения к базе данных.
   * @param { string } url Ссылка на базу данных
   * @param { () => void } callback Функция которая будет испольнена после успешного подключения.
   */
  static async connect(url, callback) {
    await mongoose
      .connect(url)
      .then(callback)
      .catch((e) => {
        throw e;
      });
    console.log("\nDatabase connected successfully.".green);
  }
}

export default Database;
