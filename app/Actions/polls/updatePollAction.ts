import Poll from "#models/Poll";

export default class UpdatePollAction {
  execute(data: Partial<Poll>, poll: Poll) {
    return poll.merge(data);
  }
}
