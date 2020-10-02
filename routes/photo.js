var express = require('express');
var router = express.Router();
const multer = require('multer');
const userController = require("../controllers/place");

/* GET users listing. */
//router.post('/signUUID', userController.signUUID);

//사용자가 선택한 이미지 
/*router.post('/insert', async (req, res) => {
    const questions = req.body;
    const fields = "photo";
    const insertPhoto = `Insert INTO muze.image (${fields}) values (?)`;
    const insertPhotoResult = await db.queryParam_Parse(insertPhoto,photo);

    if (!insertPhotoResult) {
        res.status(600).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));
    } else {
        res.status(200).send(defaultRes.successTrue(statusCode.OK, resMessage.INSERT_AD_SUCCESS));
    }

});
*/

router.post('/', userController.addphoto);

/*
//사용자가 선택한 이미지 보여주기
router.get('/photo',async(req,res)=>{
    const resData = [];
    const getPhoto = "SELECT photo FROM IMAGE where userImage =  "
})

/관리자가 선택한 이미지 보여주기
router.get('/random', authUtils.isLoggedin, async (req, res) => {
    const resData = [];
    const getHeaderQuery = "SELECT adIdx, thumbnail,applyTo,title,subtitle FROM Ad WHERE isPick = 1 order by rand() ";
    const getHeaderResult = await db.queryParam_Arr(getHeaderQuery, [req.body.isPick]);

    for (let i = 0; i < getHeaderResult.length; i++) {

        const item = {
            thumbnail: "",
            title: "",
            subtitle: "",
            dday: ''
        };


        item.thumbnail = getHeaderResult[i].thumbnail;
        item.title = getHeaderResult[i].title;
        item.subtitle = getHeaderResult[i].subtitle;
        item.adIdx = getHeaderResult[i].adIdx;

        // console.log(getHeaderResult[0].applyTo);
        var t1 = moment(getHeaderResult[i].applyTo, 'YYYY-MM-DD HH:mm');
        var t2 = moment();


        let ddayfull = moment.duration(t2.diff(t1)).asDays();
        //6.231323
        let ddayfullstring = ddayfull.toString();
        // console.log(ddayfull)
        let dday = ddayfullstring.split(".");

        item.dday = Number(dday[0]);

        resData.push(item);

    }
    // console.log(getHeaderResult);
    if (!getHeaderResult) {
        res.status(600).send(defaultRes.successFalse(statusCode.DB_ERROR, resMessage.DB_ERROR));
    } else {
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "광고 홈 상단 헤더 이미지 성공", resData));
    }

});
*/

module.exports = router;
