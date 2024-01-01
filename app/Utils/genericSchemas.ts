import { schema, rules } from "@ioc:Adonis/Core/Validator";

export const UuidSchema = schema.create({
  id: schema.string([rules.uuid()]),
});

export const OptionalUuidSchema = schema.create({
  id: schema.string.optional([rules.uuid()]),
});

export const emailSchema = schema.create({
  email: schema.string([rules.email()]),
});
