import { BaseModelFilter } from "@ioc:Adonis/Addons/LucidFilter";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import Vehicle from "App/Models/Vehicle";

export default class VehicleFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Vehicle, Vehicle>;

  public static blacklist: string[] = ["secretMethod"];

  id(id: number) {
    this.$query.where("id", id);
  }
  brand_id(brand_id: number) {
    this.$query.where("brand_id", brand_id);
  }

  model(model: string) {
    this.$query.where("model", "LIKE", `%${model}%`);
  }
  year(year: number) {
    this.$query.where("year", "LIKE", `%${year}%`);
  }
  slug(slug: string) {
    this.$query.where("slug", "LIKE", `%${slug}%`);
  }
}
