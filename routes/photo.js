var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.post('/signUUID', userController.signUUID);

//사용자가 선택한 이미지 
router.post('/insert', upload.array('imgs'), async (req, res) => {
    const photo = req.body;
    const insertPhoto = `Insert INTO image(photo) values (?)`;
    const insertPhotoResult = await db.queryParam_Parse(insertPhoto,photo);

    if (!insertPhotoResult) {
        res.status(600).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));
    } else {
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.INSERT_AD_SUCCESS));
    }

});



//사용자가 선택한 이미지 보여주기
router.get('/photo',async(req,res)=>{
    const resData = [];
    const getPhoto = "SELECT photo FROM IMAGE where userImage =  "
})



module.exports = router;
