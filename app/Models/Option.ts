import { BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import AppBaseModel from "./AppBaseModel";
import Poll from "./Poll";

export default class Option extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public pollId: number;

  /**
   * Relations
   */
  @belongsTo(() => Poll, { foreignKey: "pollId" })
  public poll: BelongsTo<typeof Poll>;
}
