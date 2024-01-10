import Poll from "#models/Poll";

export default class UpdatePollAction {
  execute(payload: Partial<Poll>, poll: Poll) {
    return poll.merge(payload);
  }
}
