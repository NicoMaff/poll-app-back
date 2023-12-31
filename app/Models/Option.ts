import { BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import AppBaseModel from "#models/AppBaseModel";
import Poll from "#models/Poll";

export default class Option extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public pollId: string;

  /**
   * Relations
   */
  @belongsTo(() => Poll, { foreignKey: "pollId" })
  public poll: BelongsTo<typeof Poll>;
}
