import Token from "../helpers/token";
const { verifyToken } = Token;
import createError from "http-errors";

export default async function (request, response, next) {
  try {
    let token =
      request.headers["x-access-token"] || request.headers["authorization"];
    let checkBearer = "Bearer ";
    token = token.slice(checkBearer.length, token.length);
    const user = verifyToken(token);
    request.user = user.payload;
    next();
    return;
  } catch (error) {
    return response.status(401).send("Invalid/expired Token");
  }
}
