import Option from "#models/Option";
import Poll from "#models/Poll";

export default class CreateOptionsLinkedToPoll {
  execute(options: Partial<Option>[], poll: Poll) {
    return poll.related("options").createMany(options);
  }
}
