import User from "#models/User";

export default class CreateUserAction {
  execute(payload: Partial<User>, password: string) {
    return User.create({ ...payload, password });
  }
}
