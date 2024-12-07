const { Model } = require("objection");

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "priority", "due_date", "user_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        priority: { type: "string", enum: ["Low", "High"], default: "Low" },
        due_date: { type: "string", format: "date" },
        user_id: { type: "integer" },
      },
    };
  }
}

module.exports = Task;
