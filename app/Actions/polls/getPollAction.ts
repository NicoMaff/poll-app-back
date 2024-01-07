import Poll from "#models/Poll";

export default class GetPollAction {
  execute(id?: string) {
    return id
      ? Poll.query().preload("options").where("id", id)
      : Poll.query().preload("options");
  }
}
