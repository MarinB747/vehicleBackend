import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Vehicle from "./Vehicle";
import { slugify } from "@ioc:Adonis/Addons/LucidSlugify";

export default class Brand extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  @slugify({
    strategy: "simple",
    fields: ["name"],
    allowUpdates: true,
  })
  public slug: string;

  //todo: ovdje napravikt da se slug autopmatski generira iz namea
  //todo: mozes pretragu modela po id i po slugu.. ovdje iskoristit query scope
  //todo: relacija: na aute nam treba

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Vehicle, {
    foreignKey: "brand_id",
  })
  public vehicles: HasMany<typeof Vehicle>;
}
