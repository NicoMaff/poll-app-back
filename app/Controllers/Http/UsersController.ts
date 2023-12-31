import User from "#models/User";
import { OptionalUuidSchema, UuidSchema } from "#utils/UuidSchema";
import { randomPassword } from "#utils/randomPassword";
import CreateUserByAdminValidator from "#validators/CreateUserByAdminValidator";
import UpdateUserByAdminValidator from "#validators/UpdateUserByAdminValidator";
import UpdateUserValidator from "#validators/UpdateUserValidator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from "@ioc:Adonis/Core/Validator";

export default class UsersController {
  /**
   * Return data of authenticated user
   */
  public async me({ auth, response }: HttpContextContract) {
    return response.ok(auth.user);
  }

  /**
   * Return data of one user or all
   */
  public async show({ params, response, bouncer }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: OptionalUuidSchema,
      data: { id: params.id },
    });
    await bouncer.authorize("isAdmin");

    if (id) {
      const user = await User.find(id);
      return response.ok(user);
    }

    const users = await User.all();
    return response.ok(users);
  }

  /**
   * Create a new user
   */
  public async create({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(CreateUserByAdminValidator);
    await bouncer.authorize("isAdmin");
    const password = randomPassword();

    const user = await User.create({ ...payload, password });

    return response.ok(user);
  }

  /**
   *  Update either one user's data, either data of authenticated user
   */
  public async update({
    request,
    auth,
    response,
    bouncer,
    params,
  }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: OptionalUuidSchema,
      data: { id: params.id },
    });

    if (id) {
      await bouncer.authorize("isAdmin");

      const payload = await request.validate(UpdateUserByAdminValidator);
      const user = await User.findOrFail(id);

      user.merge(payload);
      user.save();

      return response.created(user);
    }

    const { user } = auth;
    const payload = await request.validate(UpdateUserValidator);
    user?.merge(payload);
    user?.save();

    return response.created(auth.user);
  }

  /**
   * Destroy one user account
   */
  public async destroy({ params, bouncer, response }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: UuidSchema,
      data: { id: params.id },
    });

    await bouncer.authorize("isAdmin");
    const user = await User.findOrFail(id);
    user.delete();
    return response.ok({
      message: `The user account has been correctly deleted!`,
    });
  }
}
