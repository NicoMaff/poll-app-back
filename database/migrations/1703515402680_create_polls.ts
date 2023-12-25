import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "polls";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table
        .uuid("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table.string("question", 255).notNullable();
      table.text("description").nullable();
      table.boolean("is_multiple_choice").notNullable().defaultTo(false);
      table.boolean("has_undefined_choice").defaultTo(false);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
