import Factory from "@ioc:Adonis/Lucid/Factory";
import User from "../../app/Models/User";
import Poll from "../../app/Models/Poll";
import Option from "../../app/Models/Option";
import Participation from "../../app/Models/Participation";

export const UserFactory = Factory.define(User, ({ faker }) => {
  const lastName = faker.person.lastName().toLowerCase();
  const firstName = faker.person.firstName().toLowerCase();

  return {
    lastName,
    firstName,
    email: `${firstName}.${lastName}@mail.com`,
    password: "password",
    roles: Math.ceil(Math.random()) * 10 === 1 ? ["ROLE_ADMIN"] : ["ROLE_USER"],
  };
})
  .relation("polls", () => Poll)
  .build();

export const OptionFactory = Factory.define(Option, ({ faker }) => {
  return {
    title: faker.lorem.words({ min: 3, max: 12 }),
  };
}).build();

export const PollFactory = Factory.define(Poll, ({ faker }) => {
  return {
    question: faker.lorem.sentence({ min: 5, max: 15 }),
    description:
      Math.round(Math.random()) === 1
        ? faker.lorem.words({ min: 10, max: 30 })
        : null,
    isMultipleChoice: Math.ceil(Math.random() * 3) === 1 ? true : false,
    hasUndefinedChoice: Math.ceil(Math.random() * 5) === 1 ? true : false,
  };
})
  .relation("options", () => Option)
  .build();

export const ParticipationFactory = Factory.define(
  Participation,
  ({ faker }) => {
    // const person =
    //   Math.ceil(Math.random()) * 3 === 1
    //     ? {
    //         username: faker.person.fullName(),
    //         userEmail: faker.internet.email(),
    //       }
    //     : { username: undefined, userEmail: undefined };

    // return {
    //   username: person.username,
    //   userEmail: person.userEmail,
    // };

    return {
      username: faker.person.fullName(),
      userEmail: faker.internet.email().toLowerCase(),
      userId: undefined,
    };
  }
).build();
