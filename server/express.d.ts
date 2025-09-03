
import { JwtPayload } from "jsonwebtoken";
import { AuthPayload } from "./types/AuthPayload";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}