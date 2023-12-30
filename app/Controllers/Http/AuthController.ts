import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "../../Validators/CreateUserValidator";
import User from "../../Models/User";

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    await auth.use("web").attempt(email, password);

    return response.json("Connection succeed!");
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.json("Logout succeed.");
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const newUser = await User.create(payload);

    return response.json(newUser);
  }
}
