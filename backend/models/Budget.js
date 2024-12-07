const { Model } = require("objection");

class Budget extends Model {
  static get tableName() {
    return "budgets";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "balance"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        balance: { type: "number" },
      },
    };
  }
}

module.exports = Budget;
