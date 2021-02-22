const jwt = require('jsonwebtoken');
const parseToken = require('jwt-decode');
const APIError = require('../../constants/APIError');

class AuthMiddleware {
    constructor() {

    }

    async createToken(payload, expiresIn=86400) {
        //changed from process.env.secret to custom string
        let token = await jwt.sign(payload,'arstrdjjthdtdhgdtychgkhkdty' , {
            expiresIn: expiresIn
        });
        return token;
    }

    async verifyToken(req,res,next) {
        try {
            let token = req.headers['token'] || req.body.token || req.query.token || req.params.token;
            if(!token) {
                throw APIError.MissingToken;
            } 
            let verification = await jwt.verify(token, 'arstrdjjthdtdhgdtychgkhkdty');
            if(verification) {
                next();
            } else {
                throw APIError.InvalidToken;
            }
        } catch (err) {
            next(err);
        }
        
    }

    async parseToken(token) {
        let payload = await parseToken(token);
        return payload;
    }
}

module.exports = AuthMiddleware;