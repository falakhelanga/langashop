import jwt from "jsonwebtoken";

const tokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

export default tokenGenerator;
