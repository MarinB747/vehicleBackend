import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Brand from "App/Models/Brand";
export default class BrandsController {
  public async index(ctx: HttpContextContract) {
    return Brand.all();
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body();

    const brand = await Brand.create(body);

    response.status(201);

    return brand;
  }
  public async show({ params }: HttpContextContract) {
    return Brand.findOrFail(params.id);
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();

    const brand = await Brand.findOrFail(params.id);

    brand.name = body.name;

    return brand.save();
  }
  public async destroy({ params, response }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id);

    response.status(204);

    return brand.delete();
  }
}
