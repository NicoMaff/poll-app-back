import User from "#models/User";

export default class DeleteUserAction {
  execute(user: User) {
    return user.delete();
  }
}
