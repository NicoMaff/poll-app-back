import Poll from "#models/Poll";

export default class GetPollAction {
  execute(id?: string) {
    return id ? Poll.findOrFail(id) : Poll.all();
  }
}
