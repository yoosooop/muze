const pool = require('../modules/pool');
const jwt = require('../modules/jwt');
const { query } = require('express');
const photoImageTB = 'photoImageTB';

const photo = {
    addPhoto : async({
        imageUrl
    })=>{
        const addPhotoQuery = `Insert INTO muze.image (imageUrl) values (?)`;
        try {
            await pool
                .Transaction(async (conn) => {
                    let addPhotoResult = await conn.query(addPhotoQuery);
                    await conn.query(getPlaceIdxQuery, [groupIdx, mapx, mapy]);
                    let imageIdx = addPhotoResult.insertId; // insert문으로 place넣고난 담에 (회원가입이랑 똑같음) plaecTB의 placeIdx값 뽑아낸다.

                    for (let i = 0; i < imageUrl.length; i++) {
                        await conn.query(addPlaceImageQuery, [placeIdx, imageUrl[i]]); // 여기서는 placeImg테이블에 아까 구한 placeIdx값 넣어준다
                    }
                })
                .catch((err) => {
                    console.log('사진 추가 트랜잭션 오류! :', err);
                    throw err;
                });
        } catch (e) {
            console.log('사진 추가 에러 :', e);
            throw e;
        }
    }
}