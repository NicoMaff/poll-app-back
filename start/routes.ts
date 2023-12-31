/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";
import User from "#models/User";

Route.get("/", async ({}) => {
  const users = await User.all();
  return users;
}).middleware("auth");

/**
 * Group prefixed by "/api"
 */
Route.group(() => {
  /**
   * PRIVATE
   */
  Route.group(() => {
    /**
     * User
     */
    Route.get("/me", "UsersController.me");
    Route.get("/user/:id", "UsersController.show");
    Route.get("/users", "UsersController.show");
  }).middleware("auth");

  /**
   * PUBLIC
   */
  Route.group(() => {
    /**
     * Auth
     */
    Route.post("/login", "AuthController.login");
    Route.post("/logout", "AuthController.logout");
    Route.post("/register", "AuthController.register");
  });

  //
}).prefix("/api");
