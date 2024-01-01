import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PasswordResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string([
      rules.confirmed("confirmPassword"),
      rules.minLength(6),
    ]),
  });

  public messages: CustomMessages = {};
}
