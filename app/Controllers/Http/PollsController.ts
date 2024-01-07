import CreateOptionsLinkedToPoll from "#actions/polls/createOptionsLinkedToPoll";
import CreatePollAction from "#actions/polls/createPollAction";
import DeletePollAction from "#actions/polls/deletePollAction";
import GetPollAction from "#actions/polls/getPollAction";
import UpdateOptionsLinkedToPoll from "#actions/polls/updateOptionsLinkedToPoll";
import UpdatePollAction from "#actions/polls/updatePollAction";
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
    private DeletePollAction: DeletePollAction,
    private CreateOptionsLinkedToPoll: CreateOptionsLinkedToPoll,
    private UpdateOptionsLinkedToPoll: UpdateOptionsLinkedToPoll
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

    const poll = await this.CreatePollAction.execute(payload.poll, user);
    await this.CreateOptionsLinkedToPoll.execute(payload.options, poll);

    const pollWithOptions = await Poll.query()
      .preload("options")
      .where("id", poll.id)
      .firstOrFail();
    return response.json(pollWithOptions);
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
    const poll = await Poll.query()
      .preload("options")
      .where("id", id)
      .firstOrFail();

    if (!isAdmin && poll.user !== user)
      throw new Error("You don't own this poll!");

    const payload = await request.validate(UpdatePollValidator);
    const options = (await poll.related("options").query()).map(
      (option) => option.id
    );

    console.log(options);

    for (let i = 0; i < payload.options.length; i++) {
      console.log(i);
      console.log(payload.options[i].id);

      if (!options.includes(payload.options[i].id))
        throw new Error("This option id does not belong to this poll!");
    }

    this.UpdatePollAction.execute(payload.poll, poll);
    await this.UpdateOptionsLinkedToPoll.execute(payload.options);
    await poll.save();

    const updatedPoll = await Poll.query()
      .preload("options")
      .where("id", poll.id)
      .firstOrFail();

    return response.json(updatedPoll);
  }

  /**
   * Destroy one option of a poll
   */
  // public async destroyOption({
  //   params,
  //   auth,
  //   bouncer,
  //   response,
  // }: HttpContextContract) {
  //   const user = await auth.authenticate();
  //   const isAdmin = await bouncer.allows("isAdmin");

  //   if (!isAdmin) {
  //     const poll = await Poll.query()
  //       .preload("options")
  //       .where("userId", user.id)
  //       .firstOrFail();
  //   }
  // }

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
