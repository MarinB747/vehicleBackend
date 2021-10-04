import { BaseModelFilter } from "@ioc:Adonis/Addons/LucidFilter";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import Brand from "App/Models/Brand";

export default class BrandFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Brand, Brand>;

  public static blacklist: string[] = ["secretMethod"];

  // This will filter 'companyId', 'company_id' OR 'company'
  id(id: number) {
    this.$query.where("id", id);
  }

  name(name: string) {
    this.$query.where("name", "LIKE", `%${name}%`);
  }
  slug(slug: string) {
    this.$query.where("slug", "LIKE", `%${slug}%`);
  }
}
