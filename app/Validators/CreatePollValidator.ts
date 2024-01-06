import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePollValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string(),
    description: schema.string.optional(),
    isMultipleChoice: schema.boolean(),
    hasUndefinedChoice: schema.boolean(),
  });

  public messages: CustomMessages = {};
}
