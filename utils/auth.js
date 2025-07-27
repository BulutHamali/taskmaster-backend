import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "defaultsecret";
const expiration = "2h";

// Create a signed token
export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

// Middleware to verify JWT and attach user data
export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  // Check for Bearer token
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data; // Make user available to routes
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
