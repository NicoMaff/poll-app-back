import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastName: schema.string.optional(),
    firstName: schema.string.optional(),
    password: schema.string.optional([
      rules.confirmed("confirmPassword"),
      rules.minLength(6),
    ]),
    email: schema.string.optional([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages: CustomMessages = {};
}
