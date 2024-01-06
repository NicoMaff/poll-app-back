import Poll from "#models/Poll";
import User from "#models/User";

export default class CreatePollAction {
  execute(data: Partial<Poll>, user: User) {
    return user.related("polls").create(data);
  }
}
