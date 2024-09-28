import { TOKEN_SECRET } from "../config/Token_secret";
import jwt from "jsonwebtoken";

export default function createAccessToken(payload: any){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};