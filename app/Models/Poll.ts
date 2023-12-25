import { DateTime } from "luxon";

import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Option from "./Option";
import Participation from "./Participation";

export default class Poll extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

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
   * Relations
   */

  @belongsTo(() => User, { foreignKey: "userId" })
  public user: BelongsTo<typeof User>;

  @hasMany(() => Option)
  public options: HasMany<typeof Option>;

  @hasMany(() => Participation)
  public participations: HasMany<typeof Participation>;
}
