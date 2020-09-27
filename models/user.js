const pool = require('../modules/pool');
const jwt = require('../modules/jwt');
const { query } = require('express');

const user = {
    signUp: async (uuid) => {
        const questions = "?";
        const fields = "uuid";
        const values = [uuid];
        const query = `INSERT INTO muze.user (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query,values);
            const user = {
                userIdx: result.insertId,
                uuid: uuid
            };
            

            return user;

        } catch (err) {
            console.log("signUp ERROR: ", err);
        }
    },

    getUserByUUID: async (uuid) => {
        try {
            const user_query = `SELECT * FROM user WHERE uuid="${uuid}"`;
            const user_result = await pool.queryParam(user_query);
            //console.log(user_result);
            console.log("USER RESULT: ", user_result);
            if (user_result.length === 0) {
                return user_result;
            }
            else {
                const userIdx = user_result[0].userIdx;
                const final_result = {
                    userIdx: userIdx,
                    uuid: uuid,
                };
                return [final_result];
            }
        } catch (err) {
            console.log("getUserByUUID ERROR: ", err);
            throw err;
        }
    }
}

module.exports = user;