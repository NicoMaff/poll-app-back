import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Poll from "./Poll";
import Option from "./Option";

export default class Participation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public username: string;

  @column()
  public userEmail: string;

  @column()
  public pollId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Relations
   */
  @belongsTo(() => User, { foreignKey: "userId" })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Poll, { foreignKey: "pollId" })
  public poll: BelongsTo<typeof Poll>;

  @manyToMany(() => Option, {
    pivotTable: "user_choices",
    localKey: "id",
    pivotForeignKey: "participation_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "option_id",
  })
  public options: ManyToMany<typeof Option>;
}
