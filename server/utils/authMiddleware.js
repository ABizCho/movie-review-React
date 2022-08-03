const jwt = require("jsonwebtoken");
const jwtConfig = require("./../config/jwtConfig");

module.exports = async (req, res, next) => {
  //token값을 header에서 가져옴.
  const accessToken = req.header("accessToken");

  if (accessToken === null || accessToken === undefined) {
    res
      .status(403)
      .json({ status: false, message: "권한 오류 : null or undefined" });
  } else {
    try {
      // Token 인증부분 작성
      const tokenInfo = await new Promise((resolve, reject) => {
        jwt.verify(accessToken, jwtConfig.secret, (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
            console.log(`[토큰 값 확인 완료]`);
          }
        });
      });

      req.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      res
        .status(403)
        .json({ status: false, message: "권한 오류 : null or undefined" });
    }
  }
};
