/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import User from "../app/Models/User";

Route.get("/", async ({ session }) => {
  const users = await User.all();
  console.log(session.all());
  return users;
});

Route.get("/login", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");

  try {
    await auth.use("web").attempt(email, password);
    response.json({ status: "Success!" });
    // response.redirect("/");
  } catch {
    return response.badRequest("Invalid credentials");
  }
});

Route.get("/logout", async ({ session }) => {
  session.clear();
});

Route.get("/private", async ({ auth, response }) => {
  await auth.authenticate();
  console.log(auth.use("web").user!);
  return response.json({ result: "You have access to private data!" });
});
