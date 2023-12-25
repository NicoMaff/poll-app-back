import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "../../app/Models/User";

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        lastName: "mafféïs",
        firstName: "nicolas",
        email: "nico@mail.com",
        password: "password",
        roles: ["ROLE_ADMIN"],
      },
      {
        lastName: "derrien",
        firstName: "yohann",
        email: "yohann@mail.com",
        password: "password",
      },
    ]);
  }
}
