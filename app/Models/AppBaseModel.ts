import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import CamelCaseNamingStrategy from "#strategies/CamelCaseNamingStrategy";

export default class AppBaseModel extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();
}
