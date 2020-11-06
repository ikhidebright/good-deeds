import Token from '../helpers/token'
const { verifyToken } = Token

export default function (request, response, next) {
    try {
    let token = request.headers['x-access-token'] || req.headers['authorization'];
    let checkBearer = 'Bearer '
    if (token.startsWith(checkBearer)) {
        token = token.slice(checkBearer.length, token,length);
    }

    if (token) {
        const user = verifyToken(token)
        request.user = user
        next()
    }
    } catch (error) {
        console.log(error)
    }
}