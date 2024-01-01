import Token from "#models/Token";
import User from "#models/User";
import { emailSchema } from "#utils/genericSchemas";
import PasswordResetValidator from "#validators/PasswordResetValidator";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class PasswordResetController {
  /**
   * Check if user exists and send an email with the reset token
   */
  async init({ request, response }: HttpContextContract) {
    const { email } = await request.validate({ schema: emailSchema });
    console.log(email);

    const user = await User.findBy("email", email);

    if (!user) {
      return response.ok({ message: "Password reset process initialized!" });
    }

    const token = await Token.generatePasswordResetToken(user);
    console.log(token);

    const resetLink = `${Env.get("FRONT_DOMAIN")}/${token}`;
    console.log(resetLink);

    await Mail.sendLater((message) => {
      message
        .from("noreply@test.com")
        .to(user.email)
        .subject("Votre lien de réinitialisation !")
        .html(
          token
          // `Réinitialiser votre mot de passe en <a href="${resetLink}">cliquant ici</a>.`
        );
    });

    return response.ok({ message: "Password reset process initialized!" });
  }

  /**
   * Verify the returned token and save the new user's password
   */
  async reset({ request, params, response }: HttpContextContract) {
    const token = params.token;
    const isValid = await Token.verify(token);

    if (!isValid) {
      return response.forbidden({
        message: "The token is invalid or expired!",
      });
    }

    const payload = await request.validate(PasswordResetValidator);
    const user = await Token.getUserFromPasswordResetToken(token);

    if (!user) {
      return response.notFound({ message: "User not found!" });
    }

    user.merge(payload);
    user.save();

    return response.ok({
      message: "The password has been successfully reset.",
    });
  }
}
