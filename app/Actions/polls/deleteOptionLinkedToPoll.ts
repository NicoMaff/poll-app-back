import Option from "#models/Option";

export default class DeleteOptionLinkedToPoll {
  execute(option: Option) {
    return option.delete();
  }
}
