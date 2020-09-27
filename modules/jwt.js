const jwt = require('jsonwebtoken');
const dbConfig = require('../config/dbConfig');
const options = require('../config/dbConfig').options;
const refreshOptions = require('../config/dbConfig').refreshOptions;
const UserModel = require('../models/user');
const secertOrPrivatekey = 'jwtSecertKey';
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        payload = {
            userIdx: user.userIdx,
            uuid: user.uuid,
            gender: user.gender,
            nickname: user.nickname,
            image: user.image,
            badge: user.badge
        }
        const result = {
            token: jwt.sign(payload, secertOrPrivatekey, options),
            refreshToken: jwt.sign(payload, secertOrPrivatekey, refreshOptions)
        };
        // await UserModel.updateRefreshToken(payload.userIdx, result.refreshToken);
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secertOrPrivatekey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    },
    refresh: async (refreshToken) => {
        try {
            const result = jwt.verify(refreshToken, secertOrPrivatekey);
            if (result.userIdx === undefined) {
                return TOKEN_INVALID;
            }
            const user = await UserModel.getUserByIdx(result.userIdx);
            if (refreshToken !== user[0].refreshToken) {
                console.log('invalid refresh token');
                return TOKEN_INVALID;
            }
            const payload = {
                userIdx: user[0].userIdx,
                name: user[0].name
            };
            const dto = {
                token: jwt.sign(payload,secertOrPrivatekey, options),
                refreshToken: jwt.sign(payload, secertOrPrivatekey, refreshOptions)
            };
            await UserModel.updateRefreshToken(payload.userIdx, dto.refreshToken);
            return dto;
        } catch (err) {
            console.log('jwt.js ERROR : ', err);
            throw err;
        }
    }
}