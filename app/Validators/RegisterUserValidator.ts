import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastName: schema.string(),
    firstName: schema.string(),
    password: schema.string([
      rules.confirmed("confirmPassword"),
      rules.minLength(6),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages: CustomMessages = {};
}
