import { Db } from "../services/database.service";
import { User, IUser, IUserMethods } from "../models/user.model";
import { HydratedDocument } from "mongoose";
import { roles } from "../models/roles";

Db.connect().then((connection) => {
  // seed users
  const users = [
    {
      email: "admin@yopmail.com",
      password: "foobar",
      firstname: "admin",
      lastname: "admin",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.ADMIN,
    },
    {
      email: "admin1@yopmail.com",
      password: "foobar",
      firstname: "admin1",
      lastname: "admin1",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.ADMIN,
    },
    {
      email: "admin2@yopmail.com",
      password: "foobar",
      firstname: "admin2",
      lastname: "admin2",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.ADMIN,
    },
    {
      email: "manager@yopmail.com",
      password: "foobar",
      firstname: "manager",
      lastname: "manager",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MANAGER,
    },
    {
      email: "manager1@yopmail.com",
      password: "foobar",
      firstname: "manager1",
      lastname: "manager1",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MANAGER,
    },
    {
      email: "manager2@yopmail.com",
      password: "foobar",
      firstname: "manager2",
      lastname: "manager2",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MANAGER,
    },
    {
      email: "merchant@yopmail.com",
      password: "foobar",
      firstname: "merchant",
      lastname: "merchant",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MERCHANT,
    },
    {
      email: "merchant1@yopmail.com",
      password: "foobar",
      firstname: "merchant1",
      lastname: "merchant1",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MERCHANT,
    },
    {
      email: "merchant2@yopmail.com",
      password: "foobar",
      firstname: "merchant2",
      lastname: "merchant2",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.MERCHANT,
    },
    {
      email: "user@yopmail.com",
      password: "foobar",
      firstname: "user",
      lastname: "user",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.USER,
    },
    {
      email: "user1@yopmail.com",
      password: "foobar",
      firstname: "user1",
      lastname: "user1",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.USER,
    },
    {
      email: "user2@yopmail.com",
      password: "foobar",
      firstname: "user2",
      lastname: "user2",
      address: "7 rue de la charité",
      postcode: "13000",
      country: "FRANCE",
      role: roles.USER,
    },
  ];

  Promise.all(users.map(async (user) => User.register(user)))
    .then((users) => {
      const userIds = users.map((user) => user.id);
      console.log(`users registered with success, ids:`, userIds);
      process.exit(0);
    })
    .catch((error) => {
      console.log(error);
      process.exit(0);
    });
});
