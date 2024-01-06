import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdatePollValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string.optional(),
    description: schema.string.optional(),
    isMultipleChoice: schema.boolean.optional(),
    hasUndefinedChoice: schema.boolean.optional(),
  });

  public messages: CustomMessages = {};
}
