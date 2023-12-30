import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { UserFactory } from "../factories";
import User from "../../app/Models/User";

export default class extends BaseSeeder {
  public async run() {
    await UserFactory.createMany(10);
    await User.create({
      lastName: "mafféïs",
      firstName: "nicolas",
      email: "nico@mail.com",
      password: "password",
      roles: ["ROLE_SUPERADMIN"],
    });
  }
}
