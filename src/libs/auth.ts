import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET || "thasdasedawdewadsdad";

export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Verify a jwt token

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded
      ? { id: decoded.id, email: decoded.email, username: decoded.username }
      : null;
  } catch (error) {
    return null;
  }
};

export const validateJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decoded; // Return the decoded token payload
  } catch (error) {
    console.error("JWT validation error:", error);
    return false; // Invalid token
  }
};
