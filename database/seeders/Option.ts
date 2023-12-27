import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { OptionFactory } from "../factories";
import Poll from "../../app/Models/Poll";

export default class extends BaseSeeder {
  public async run() {
    const polls = await Poll.all();

    await OptionFactory.merge([
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
      { pollId: polls[Math.floor(Math.random() * 10)].id },
    ]).createMany(30);
  }
}
