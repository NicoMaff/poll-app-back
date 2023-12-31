import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserByAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lastName: schema.string(),
    firstName: schema.string(),
    email: schema.string([
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages: CustomMessages = {};
}
