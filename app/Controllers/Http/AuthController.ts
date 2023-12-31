// import User from "#models/User";
// import CreateUserValidator from "#validators/CreateUserValidator";
import User from "#models/User";
import RegisterUserValidator from "#validators/RegisterUserValidator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    await auth.use("web").attempt(email, password);

    return response.ok({ message: "Connection succeed!" });
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.json({ message: "Logout succeed." });
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator);
    const newUser = await User.create(payload);

    return response.json(newUser);
  }
}
