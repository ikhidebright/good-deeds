import { sign, verify } from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export default class Token {
    static createToken (payload, secret = process.env.pannt) {
        return sign({payload}, secret, { expiresIn: 60*60 })
    }

    static verifyToken (token, secret = process.env.pannt) {
        return verify(token, secret)
    }
}