import CreateUserAction from "#actions/users/createUserAction";
import DeleteUserAction from "#actions/users/deleteUserAction";
import GetUSerAction from "#actions/users/getUserAction";
import UpdateUserAction from "#actions/users/updateUserAction";
import User from "#models/User";
import { OptionalUuidSchema, UuidSchema } from "#utils/genericSchemas";
import CreateUserByAdminValidator from "#validators/CreateUserByAdminValidator";
import UpdateUserByAdminValidator from "#validators/UpdateUserByAdminValidator";
import UpdateUserValidator from "#validators/UpdateUserValidator";
import { inject } from "@adonisjs/core/build/standalone";
import { string } from "@ioc:Adonis/Core/Helpers";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from "@ioc:Adonis/Core/Validator";

@inject()
export default class UsersController {
  constructor(
    private CreateUserAction: CreateUserAction,
    private GetUserAction: GetUSerAction,
    private UpdateUserAction: UpdateUserAction,
    private DeleteUserAction: DeleteUserAction
  ) {}

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
      const user = await this.GetUserAction.execute(id);
      return response.ok(user);
    }

    const users = await this.GetUserAction.execute();
    return response.ok(users);
  }

  /**
   * Create a new user
   */
  public async create({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(CreateUserByAdminValidator);
    await bouncer.authorize("isAdmin");
    const password = string.generateRandom(10);

    const user = await this.CreateUserAction.execute(payload, password);

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

      this.UpdateUserAction.execute(payload, user);
      await user.save();

      return response.created(user);
    }

    const authenticatedUser = await auth.authenticate();
    const payload = await request.validate(UpdateUserValidator);
    this.UpdateUserAction.execute(payload, authenticatedUser);
    await authenticatedUser.save();

    return response.created(authenticatedUser);
  }

  /**
   * Destroy one user account
   */
  public async destroy({ params, bouncer, response }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: UuidSchema,
      data: { id: params.id },
    });
    if (!id) throw new Error("The poll's UUID is incorrect!");

    await bouncer.authorize("isAdmin");
    const user = await User.findOrFail(id);
    await this.DeleteUserAction.execute(user);

    return response.ok({
      message: `The user account has been correctly deleted!`,
    });
  }
}
