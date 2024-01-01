import AppBaseModel from "#models/AppBaseModel";
import { BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import User from "#models/User";
import { string } from "@ioc:Adonis/Core/Helpers";

export default class Token extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: string;

  @column()
  public type: string;

  @column()
  public token: string;

  @column.dateTime({ autoCreate: true })
  public expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */
  @belongsTo(() => User, { foreignKey: "userId" })
  public user: BelongsTo<typeof User>;

  /**
   * Methods
   */
  public static async generatePasswordResetToken(user: User) {
    const token = string.generateRandom(64);

    await this.expirePasswordResetTokens(user);
    const record = await user.related("tokens").create({
      type: "PASSWORD_RESET",
      expiresAt: DateTime.now().plus({ hour: 1 }),
      token,
    });

    return record.token;
  }

  public static async expirePasswordResetTokens(user: User) {
    await user.related("passwordResetTokens").query().update({
      expiresAt: DateTime.now(),
    });
  }

  public static async getUserFromPasswordResetToken(token: string) {
    const record = await Token.query()
      .preload("user")
      .where("token", token)
      .where("expiresAt", ">", DateTime.now().toSQL())
      .orderBy("createdAt", "desc")
      .first();

    return record?.user;
  }

  public static async verify(token: string) {
    const record = await Token.query()
      .where("expiresAt", ">", DateTime.now().toSQL())
      .where("token", token)
      .first();

    return !!record;
  }
}
