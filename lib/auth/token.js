import { SignJWT, jwtVerify } from "jose";
import { getUser } from "./getUser";

// We'll create a consistent secret key handling mechanism
async function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  // Convert string secret to Uint8Array as required by jose
  return new TextEncoder().encode(secret);
}

export async function generateToken(user) {
  try {
    // Get our secret key
    const secret = await getSecretKey();

    // Extract only plain serializable fields
    const payloadUser = {
        _id: user._id.toString(),  // Make sure it's a string
        name: user.name,
        email: user.email,
        role: user.role,
      };

    // Create and sign the token
    const token = await new SignJWT({ user:payloadUser })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate token");
  }
}

export async function verifyToken(token) {
  try {
    // Input validation
    if (!token || typeof token !== "string") {
      console.error("Invalid token format:", { receivedToken: typeof token });
      return null;
    }

    // Get our secret key
    const secret = await getSecretKey();

    // Verify and decode the token
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload);
    const user = payload.user;
    // Log successful verification
    console.log("Token verified successfully :", {
      userId: user._id,
      userName: user.name,
      role: user.role,
    });


    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
