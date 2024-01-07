import Poll from "#models/Poll";
import User from "#models/User";

export default class CreatePollAction {
  execute(payload: Partial<Poll>, user: User) {
    return user.related("polls").create(payload);
  }
}
