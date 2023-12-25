import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "user_choices";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("participation_id")
        .notNullable()
        .unsigned()
        .references("participations.id");
      table
        .integer("option_id")
        .notNullable()
        .unsigned()
        .references("options.id");
      table.unique(["participation_id", "option_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
