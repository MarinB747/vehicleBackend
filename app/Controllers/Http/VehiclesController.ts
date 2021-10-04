import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Vehicle from "App/Models/Vehicle";
export default class VehiclesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, ...input } = request.qs();
    return Vehicle.filter(input).paginate(page, 10);
  }
  public async store({ request, response }: HttpContextContract) {
    const vehicleSchema = schema.create({
      brand_id: schema.number(),
      model: schema.string({ trim: true }),
      year: schema.number(),
    });
    const payload = await request.validate({ schema: vehicleSchema });
    const vehicle = await Vehicle.create(payload);
    response.status(201);
    return vehicle;
  }
  public async show({ params, response }: HttpContextContract) {
    if (params.id) return Vehicle.findOrFail(params.id);
    else return response.status(404);
  }
  public async update({ params, request }: HttpContextContract) {
    //ako postoji name taj i taj u bazi.. kjazes mu da vec postoji auto/brand s tim imenom u bazi
    const vehicleSchema = schema.create({
      brand_id: schema.number(),
      model: schema.string({ trim: true }, [
        rules.unique({
          table: "vehicles",
          column: "model",
        }),
      ]),
      year: schema.number(),
    });
    const body = await request.validate({ schema: vehicleSchema });

    const vehicle = await Vehicle.findOrFail(params.id);

    vehicle.merge(body);

    return await vehicle.save();
  }
  public async destroy({ params, response }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id);

    response.status(204);

    return vehicle.delete();
  }
}
