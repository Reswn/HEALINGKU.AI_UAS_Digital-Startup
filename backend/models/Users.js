const { Model } = require("objection");

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        name: { type: "string", maxLength: 255 },
        birthDate: { type: "string", format: "date" },
        phone: { type: "string", maxLength: 15 },
        email: { type: "string", format: "email" },
        gender: { type: "string", enum: ["Laki-Laki", "Perempuan"] },
      },
    };
  }
}

module.exports = Users;
