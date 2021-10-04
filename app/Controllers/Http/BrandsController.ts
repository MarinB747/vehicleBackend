import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Brand from "App/Models/Brand";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class BrandsController {
  //todo: ovdje dodaj paginaciju, filtere, search po imenu necemu
  public async index({ request }: HttpContextContract) {
    const { page = 1, ...input } = request.qs();
    return Brand.filter(input).paginate(page, 10);
  }
  //todo: ovdje stavi validaciju podataka,. pogledaj kakop se koristi validator
  public async store({ request, response }: HttpContextContract) {
    const brandSchema = schema.create({
      name: schema.string({ trim: true }),
    });
    const payload = await request.validate({ schema: brandSchema });
    const brand = await Brand.create(payload);
    response.status(201);
    return brand;
  }
  public async show({ params, response }: HttpContextContract) {
    if (params.id) return Brand.findOrFail(params.id);
    else if (params.slug) return Brand.findOrFail(params.slug);
    else return response.status(404);
  }

  //todo: uibacit validaciju
  public async update({ params, request }: HttpContextContract) {
    const brandSchema = schema.create({
      name: schema.string({ trim: true }),
    });

    const body = await request.validate({ schema: brandSchema });

    const brand = await Brand.findOrFail(params.id);

    brand.merge(body);

    return await brand.save();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const brand = await Brand.findOrFail(params.id);

    //todo: ovo mos u jendoj linij koda
    response.status(204);

    return brand.delete();
  }
}
