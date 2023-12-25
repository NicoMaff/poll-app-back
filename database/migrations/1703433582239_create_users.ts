import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("last_name", 100).notNullable();
      table.string("first_name", 100).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("password", 255).notNullable();
      table
        .specificType("roles", "text array")
        .defaultTo('{"ROLE_USER"}')
        .notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
