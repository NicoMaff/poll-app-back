/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";
import User from "../app/Models/User";

Route.get("/", async ({ session }) => {
  const users = await User.all();
  console.log(session.all());
  return users;
});
//.middleware("auth");

Route.group(() => {
  /**
   * Auth
   */
  Route.post("/login", "AuthController.login");
  Route.post("/logout", "AuthController.logout");
  Route.post("/register", "AuthController.register");

  /**
   * User
   */
  Route.get("/me", "UsersController.me");
  //
}).prefix("/api");
