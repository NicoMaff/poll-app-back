import Option from "#models/Option";

export default class UpdateOptionsLinkedToPoll {
  execute(payload: Partial<Option>[]) {
    return Option.updateOrCreateMany("id", payload);
  }
}
