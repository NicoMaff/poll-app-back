import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateUserByAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastName: schema.string.optional(),
    firstName: schema.string.optional(),
    email: schema.string.optional([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages: CustomMessages = {};
}
