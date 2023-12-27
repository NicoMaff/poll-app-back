import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { PollFactory } from "../factories";
import User from "../../app/Models/User";

export default class extends BaseSeeder {
  public async run() {
    const users = await User.all();

    await PollFactory.merge([
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
      { userId: users[Math.floor(Math.random() * 10)].id },
    ]).createMany(10);
  }
}
