import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "participations";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .uuid("user_id")
        .nullable()
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table.string("username", 100).nullable();
      table.string("user_email", 255).nullable();
      table
        .uuid("poll_id")
        .notNullable()
        .unsigned()
        .references("polls.id")
        .onDelete("CASCADE");

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
