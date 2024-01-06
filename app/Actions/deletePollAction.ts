import Poll from "#models/Poll";

export default class DeletePollAction {
  execute(poll: Poll) {
    return poll.delete();
  }
}
