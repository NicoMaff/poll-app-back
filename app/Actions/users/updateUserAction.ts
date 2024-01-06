import User from "#models/User";

export default class UpdateUserAction {
  execute(payload: Partial<User>, user: User) {
    return user.merge(payload);
  }
}
