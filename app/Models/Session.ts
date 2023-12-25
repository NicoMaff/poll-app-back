import { column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import AppBaseModel from "./AppBaseModel";

export default class Session extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
