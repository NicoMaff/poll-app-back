import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { ParticipationFactory } from "../factories";
import User from "../../app/Models/User";
import Poll from "../../app/Models/Poll";

export default class extends BaseSeeder {
  public async run() {
    const users = await User.all();
    const polls = await Poll.all();

    await ParticipationFactory.merge([
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      {
        pollId: polls[Math.floor(Math.random() * 10)].id,
        userId: users[Math.floor(Math.random() * 10)].id,
        userEmail: undefined,
        username: undefined,
      },
      {
        pollId: polls[Math.floor(Math.random() * 10)].id,
        userId: users[Math.floor(Math.random() * 10)].id,
        userEmail: undefined,
        username: undefined,
      },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      {
        pollId: polls[Math.floor(Math.random() * 10)].id,
        userId: users[Math.floor(Math.random() * 10)].id,
        userEmail: undefined,
        username: undefined,
      },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      {
        pollId: polls[Math.floor(Math.random() * 10)].id,
        userId: users[Math.floor(Math.random() * 10)].id,
        userEmail: undefined,
        username: undefined,
      },
      {
        pollId: polls[Math.floor(Math.random() * 10)].id,
        userId: users[Math.floor(Math.random() * 10)].id,
        userEmail: undefined,
        username: undefined,
      },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
    ])
      // .with("options", 10)
      .createMany(10);
  }
}
