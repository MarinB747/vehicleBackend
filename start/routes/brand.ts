import Route from "@ioc:Adonis/Core/Route";

Route.resource("/brands", "BrandsController").apiOnly();
