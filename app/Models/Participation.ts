import {
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import AppBaseModel from "./AppBaseModel";
import Option from "./Option";
import Poll from "./Poll";
import User from "./User";

export default class Participation extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: string;

  @column()
  public username: string;

  @column()
  public userEmail: string;

  @column()
  public pollId: string;

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
