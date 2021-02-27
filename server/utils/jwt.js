const jwt = require('jsonwebtoken');
const secret = 'YF!MRN;Z^_kj(3S.'
const CryptoJS = require("crypto-js");
const env = process.env.NODE_ENV

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    /*if token exists*/
    if (token) {
        if (token.startsWith('Bearer ')) {
            /*Remove Bearer from string*/
            token = token.slice(7, token.length);
        }
        /*verify token*/
        // verify makes sure that the token hasn't expired and has been issued by us
        var decodedToken = jwt.decode(token, {complete: true});
        // console.log(decodedToken.header.alg);

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            /*if token is valid*/
            else {
                req.token = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};

const createJWT = (data) => {
    let issuer;

    switch (env) {
        case "local":
        case "dev":
            issuer = 'https://dev.hussainhmc.me/';
            break;
        case "staging":
        case "preprod":
        case "prod":
            issuer = 'https://hussainhmc.me/';
            break;
    }
    const user = {
        email: data.email,
        uid: data.uid,
        name: data.name,
        iat: Math.floor(Date.now() / 1000) - 30,
        aud: issuer,
        iss: issuer
    };
    return jwt.sign(user, secret, {jwtid: data.uid + '-' + new Date().getTime()}, {expiresIn: '5d'});
};

module.exports = {
    checkToken,
    createJWT
};