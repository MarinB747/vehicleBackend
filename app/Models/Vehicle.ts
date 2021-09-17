import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public parent_id: number;

  @column()
  public model: string;

  @column()
  public year: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
