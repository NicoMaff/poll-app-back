import {
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import AppBaseModel from "#models/AppBaseModel";
import Option from "#models/Option";
import Participation from "#models/Participation";
import User from "#models/User";

export default class Poll extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public userId: string;

  @column()
  public question: string;

  @column()
  public description: string | null;

  @column()
  public isMultipleChoice: boolean;

  @column()
  public hasUndefinedChoice: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Hooks
   */
  @beforeCreate()
  public static async generateUUID(user: User) {
    user.id = v4();
  }

  /**
   * Relations
   */

  @belongsTo(() => User, { foreignKey: "userId" })
  public user: BelongsTo<typeof User>;

  @hasMany(() => Option)
  public options: HasMany<typeof Option>;

  @hasMany(() => Participation)
  public participations: HasMany<typeof Participation>;
}
