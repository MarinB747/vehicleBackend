import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Brand from "App/Models/Brand";
export default class BrandsController {
  //todo: ovdje dodaj paginaciju, filtere, search po imenu necemu
  public async index(ctx: HttpContextContract) {
    return Brand.all();
  }
  //todo: ovdje stavi validaciju podataka,. pogledaj kakop se koristi validator
  public async store({ request, response }: HttpContextContract) {
    const body = request.body();

    const payload = await Brand.create(body);

    //todo: ovdje pogledaj malo o statusima
    // response.status(201);

    // return brand;

    response.accepted(payload);
  }
  public async show({ params, response }: HttpContextContract) {
    response.ok(Brand.findOrFail(params.id));
  }
  //todo: uibacit validaciju
  public async update({ params, request }: HttpContextContract) {
    const body = request.body();

    const brand = await Brand.findOrFail(params.id);

    brand.name = body.name;

    return await brand.save();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id);

    //todo: ovo mos u jendoj linij koda
    response.status(204);

    return brand.delete();
  }
}
