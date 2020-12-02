import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "sivelafj@gmail.com",
    password: bcrypt.hashSync("2144", 12),
    isAdmin: true,
  },
  {
    name: "sindih",
    email: "sindih@fakemail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "kwanele",
    email: "kwane@fakemail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "mfana",
    email: "mfana@fakemail.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "phindile",
    email: "phondi@fakemail.com",
    password: bcrypt.hashSync("123456", 12),
  },
];

export default users;
