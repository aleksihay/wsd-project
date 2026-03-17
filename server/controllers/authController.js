import { hash, verify } from "scrypt";
import * as jwt from "@hono/hono/jwt";
import * as authRepository from "../repositories/authRepository.js";

const JWT_SECRET = "jwt_secret";

const register = async (c) => {
  const user = await c.req.json();
  const email = user.email;
  let newUser;
  try {
    user.password_hash = hash(user.password);
    newUser = await authRepository.create(user);
  } catch (err) {
    //ignore if it fails
  }
  return c.json({
    user: newUser ?? {},
    message: `Confirmation email sent to address ${email}.`});
};

const login = async (c) => {
  const user = await c.req.json();

  const foundUser = await authRepository.findByEmail(user.email);
  if (!foundUser) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const isValid = verify(user.password, foundUser.password_hash);
  if (!isValid) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const roles = await authRepository.getUserRoles(foundUser.id);
  const payload = { email: foundUser.email, id: foundUser.id, roles };
  const token = await jwt.sign(payload, JWT_SECRET);

  return c.json({
    message: "Login successful",
    user: payload,
    token,
  });
};


export { login, register };