import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdatePollValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    poll: schema.object().members({
      question: schema.string.optional(),
      description: schema.string.optional(),
      isMultipleChoice: schema.boolean.optional(),
      hasUndefinedChoice: schema.boolean.optional(),
    }),
    options: schema.array().members(
      schema.object().members({
        id: schema.number(),
        title: schema.string.optional(),
      })
    ),
  });

  public messages: CustomMessages = {};
}
