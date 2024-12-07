const { Model } = require("objection");

class Goal extends Model {
  static get tableName() {
    return "goals";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "user_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        user_id: { type: "integer" },
      },
    };
  }
}

module.exports = Goal;
