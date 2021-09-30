import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Vehicle from "App/Models/Vehicle";
export default class VehiclesController {
  public async index(ctx: HttpContextContract) {
    return Vehicle.all();
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body();

    const brand = await Vehicle.create(body);

    response.status(201);

    return brand;
  }
  public async show({ params }: HttpContextContract) {
    return Vehicle.findOrFail(params.id);
  }
  public async update({ params, request }: HttpContextContract) {
    //ako postoji name taj i taj u bazi.. kjazes mu da vec postoji auto/brand s tim imenom u bazi
    const body = request.body();

    const vehicle = await Vehicle.findOrFail(params.id);

    vehicle.brand_id = body.brand_id;
    vehicle.model = body.model;
    vehicle.year = body.year;

    return await vehicle.save();
  }
  public async destroy({ params, response }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id);

    response.status(204);

    return vehicle.delete();
  }
}
