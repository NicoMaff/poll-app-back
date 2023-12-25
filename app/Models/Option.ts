import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Poll from "./Poll";

export default class Option extends BaseModel {
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
