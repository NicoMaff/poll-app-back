import User from "#models/User";

export default class GetUSerAction {
  execute(id?: string) {
    if (id) return User.find(id);
    return User.all();
  }
}
