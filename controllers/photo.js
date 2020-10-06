const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');
const photoDB = require('../models/photo');

module.exports = {
    addphoto:async(req,res) =>{
        const imageFile = req.file;
        //const imageUrl = imageFile.map((img) => img.location);
        if (imageFile === undefined || imageFile.length === 0) {
            console.log('이미지 입력해주세요.');
            return res
                .status(statusCode.BAD_RcEQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
    }
}