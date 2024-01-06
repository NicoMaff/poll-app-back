import CreatePollAction from "#actions/createPollAction";
import DeletePollAction from "#actions/deletePollAction";
import GetPollAction from "#actions/getPollAction";
import UpdatePollAction from "#actions/updatePollAction";
import Poll from "#models/Poll";
import { OptionalUuidSchema } from "#utils/genericSchemas";
import CreatePollValidator from "#validators/CreatePollValidator";
import UpdatePollValidator from "#validators/UpdatePollValidator";
import { inject } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { validator } from "@ioc:Adonis/Core/Validator";

@inject()
export default class PollsController {
  constructor(
    private GetPollAction: GetPollAction,
    private CreatePollAction: CreatePollAction,
    private UpdatePollAction: UpdatePollAction,
    private DeletePollAction: DeletePollAction
  ) {}

  /**
   * Return data of one poll or all
   */
  async show({ params, response }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: OptionalUuidSchema,
      data: { id: params.id },
    });

    if (id) {
      const poll = await this.GetPollAction.execute(id);
      return response.json(poll);
    } else {
      const polls = await this.GetPollAction.execute();
      return response.json(polls);
    }
  }

  /**
   * Create a new poll
   */
  public async create({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const payload = await request.validate(CreatePollValidator);
    const poll = await this.CreatePollAction.execute(payload, user);

    return response.json(poll);
  }

  /**
   * Update a poll's data by the owner
   */
  public async update({
    request,
    params,
    bouncer,
    response,
    auth,
  }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: OptionalUuidSchema,
      data: { id: params.id },
    });
    if (!id) throw new Error("The poll's UUID is incorrect!");

    const user = await auth.authenticate();
    const isAdmin = await bouncer.allows("isAdmin");
    const poll = await Poll.findOrFail(id);

    if (!isAdmin && poll.user !== user)
      throw new Error("You don't own this poll!");

    const payload = await request.validate(UpdatePollValidator);

    this.UpdatePollAction.execute(payload, poll);
    await poll.save();

    return response.json(poll);
  }

  /**
   * Destroy one poll
   */
  public async destroy({
    params,
    auth,
    bouncer,
    response,
  }: HttpContextContract) {
    const { id } = await validator.validate({
      schema: OptionalUuidSchema,
      data: { id: params.id },
    });
    if (!id) throw new Error("The poll's UUID is incorrect!");

    const user = await auth.authenticate();
    const isAdmin = await bouncer.allows("isAdmin");
    const poll = await Poll.findOrFail(id);

    if (!isAdmin && poll.user !== user)
      throw new Error("You don't own this poll!");

    await this.DeletePollAction.execute(poll);
    return response.json({
      message: `The poll has been correctly deleted!`,
    });
  }
}
