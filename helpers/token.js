import { sign, verify } from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

export default class Token {
    static createToken (payload) {
        return sign({payload}, process.env.pannt, { expiresIn: 60*60 })
    }

    static verifyToken (token) {
        return verify(token, process.env.pannt)
    }
}