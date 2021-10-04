import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Brand from "./Brand";
import { slugify } from "@ioc:Adonis/Addons/LucidSlugify";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { Filterable } from "@ioc:Adonis/Addons/LucidFilter";
import VehicleFilter from "./Filters/VehicleFilter";

export default class Vehicle extends compose(BaseModel, Filterable) {
  public static $filter = () => VehicleFilter;
  @column({ isPrimary: true })
  public id: number;

  @column()
  public brand_id: number;

  @column()
  public model: string;

  @column()
  public year: number;

  @column()
  @slugify({
    strategy: "shortId",
    fields: ["model", "year"],
    allowUpdates: true,
  })
  public slug: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Brand, {
    localKey: "brand_id",
  })
  public brand: BelongsTo<typeof Brand>;
}
