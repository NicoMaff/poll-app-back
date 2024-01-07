import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePollValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    poll: schema.object().members({
      question: schema.string(),
      description: schema.string.optional(),
      isMultipleChoice: schema.boolean(),
      hasUndefinedChoice: schema.boolean(),
    }),
    options: schema
      .array()
      .members(schema.object().members({ title: schema.string.optional() })),
  });

  public messages: CustomMessages = {};
}
