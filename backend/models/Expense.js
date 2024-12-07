const { Model } = require("objection");

class Expense extends Model {
  static get tableName() {
    return "expenses";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["budget_id", "category", "amount"],
      properties: {
        id: { type: "integer" },
        budget_id: { type: "integer" },
        category: { type: "string", minLength: 1, maxLength: 255 },
        amount: { type: "number" },
      },
    };
  }
}

module.exports = Expense;
