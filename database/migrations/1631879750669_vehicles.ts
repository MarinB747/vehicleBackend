import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Vehicles extends BaseSchema {
  protected tableName = "vehicles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("brand_id")
        .notNullable()
        .unsigned()
        .references("brands.id")
        .onDelete("CASCADE");
      table.string("model").notNullable();
      table.integer("year").notNullable();
      table.string("slug").notNullable().unique();
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
