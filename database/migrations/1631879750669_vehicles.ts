import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Vehicles extends BaseSchema {
  protected tableName = "vehicles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("parent_id");
      table.string("model");
      table.integer("year");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
