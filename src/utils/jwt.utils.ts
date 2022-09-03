import { Jwt, JwtPayload, sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { Schema } from "mongoose";
import * as fs from "fs";
import * as path from "path";
import { randomUUID } from "crypto";

const secret: string = process.env.SECRET ?? "";

export const TokenSchema = new Schema(
  {
    access_token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: String || Number,
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

interface PayloadTypes {
  _id: string | number;
  username?: string | number | undefined;
  email?: string | undefined;
}

/**
 * generates JWT used for local testing
 */
export const generateToken = (payload: PayloadTypes, iss: string): object | string => {
  // read private key value
  const privateKey = fs.readFileSync(path.join(__dirname, "./../../../private.key"));

  let token_expiry: string | number | undefined = process.env.TOKEN_EXP;
  token_expiry = token_expiry ? parseInt(token_expiry) : 1;
  const rt_expiry: number | string | undefined = process.env.RT_EXP || token_expiry * 2;

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: "RS256",
  };

  const modifiedPayload: DataObj = {
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + token_expiry,
    sub: payload.username,
    iss: iss,
    jti: randomUUID(),
    scopes: ["*"],
    params: {
      ...payload,
    },
  };

  // generate JWT
  try {
    const token = sign(modifiedPayload, { key: privateKey, passphrase: secret }, signInOptions);
    const rt = sign({ owner: payload?._id, jti: randomUUID() }, secret, {
      expiresIn: rt_expiry ?? token_expiry * 2,
    });

    return {
      access_token: token,
      expires_in: token_expiry,
      refresh_token: rt,
    };
  } catch (error) {
    return {
      message: "ErrorGeneratingToken",
      error: error,
    };
  }
};

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export const validateToken = (
  token: string,
): Promise<TokenPayload | string | Jwt | JwtPayload | undefined> => {
  const publicKey = fs.readFileSync(path.join(__dirname, "./../../../public.key"));

  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
  };

  return new Promise((resolve, reject) => {
    verify(
      token,
      publicKey,
      verifyOptions,
      (error, decoded: string | TokenPayload | Jwt | JwtPayload | undefined) => {
        if (error) return reject(error);
        resolve(decoded);
      },
    );
  });
};
