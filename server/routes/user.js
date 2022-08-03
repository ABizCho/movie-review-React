// users로 사용할 라우터 객체 인스턴스 생성 및 내보내기
const { Router } = require("express");
const crypto = require("crypto");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const nodeMailer = require("nodemailer");

const router = Router();

// 자동 오류처리 미들웨어 import
const asyncHandler = require("../utils/async-handler");

router.post(
  "/signUp",
  asyncHandler(async (req, res, next) => {
    //asyncHandler를 사용해 try catch 없이 오류처리하도록 작성

    // /signUp에 라우팅 된
    const { email, password, name } = req.body;
    console.log(email, password, name);

    // 비밀번호 해쉬화 실행
    let hashPassword = passwordHash(password);
    console.log(hashPassword);

    // 중복가입 이메일을 식별자로 체크하여 실행분기
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      // throw new Error("이미 가입된 이메일 입니다.");
      res.status(500);
      res.json({
        //response를 json형태로 구성하여 error를 전달
        error: "이미 가입된 이메일 입니다.",
      });
      return;
    }

    await User.create({
      email,
      password: hashPassword, //password만 hash..로 스키마에 정의된 프로퍼티 명과 다르기 때문에 명시해줘야 들어감
      name,
    });
    res.json({
      result: "회원가입이 완료되었습니다. 로그인을 해주세요.",
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let hashPassword = passwordHash(password);

    console.log(email, password);

    //DB의 User모델의 컬렉션에서, email을 식별자로 일치하는 document 찾아 받기
    const checkEmail = await User.findOne({ email });
    // if (checkEmail.status !== null || checkEmail.status !== undefined) {
    //   if (checkEmail.status == true) {
    //     console.log(
    //       "비밀번호 초기화 했던 이력이 있으니, 비밀번호만 재설정하는 페이지로 Redirect"
    //     );
    //   }
    // }

    //email 가입 유효성 검사
    if (!checkEmail) {
      res.status(401); // 응답으로 반환할 status 설정 : 401에러(접근불가/인증실패)
      res.json({
        fail: "존재하지 않는 이메일 입니다.",
      });
      return;
    }

    //
    if (hashPassword !== checkEmail.password) {
      res.status(401);
      res.json({
        fail: "비밀번호가 틀렸습니다.",
      });
      return;
    }

    // (1)JWT: 유저의 로그인 정보를 받아 JWT 토큰 생성
    jwt.sign(
      {
        //jwt payload 작성 ( 페이로드란 JWT의 [header, payload, signature] 구성 중 하나로, 전달되는 데이터를 의미함)
        email: email,
        name: checkEmail.name,
      },
      jwtConfig.secret, // UUID 암호 문자열 가져오기
      {
        expiresIn: "1d", // 하루동안 가지고 있을 것을 지정 ( 1y, 1d, 2h, 1m, 5s)
        //임시 메모리로 보관하는 양이 (사용자수에 따라) 많아질수록 불리하므로, 30분 이하가 적당
      },

      (err, token) => {
        //에러처리
        if (err) {
          res.status(401).json({
            status: false,
            message: "로그인을 해주세요.",
          });
        }
        //에러가 아닐시 res 구성 및 응답
        else {
          res.json({
            status: true,
            accessToken: token,
            email: email,
            name: checkEmail.name,
          });
        }
      }
    );
  })
);

// 클라의 find요청에 라우팅되는 응답로직
router.post(
  "/find/password",
  asyncHandler(async (req, res, next) => {
    let { email } = req.body;
    let user = await User.findOne({ email });
    let myEmail = "he1236@ajou.ac.kr";

    let transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: myEmail,
        pass: "azsatessybsajzmn",
      },
    });

    const randomPassword = randomPw();
    const hashRandomPassword = passwordHash(randomPassword);

    await User.findOneAndUpdate(
      { shortId: user.shortId },
      {
        password: hashRandomPassword,
      }
    );

    let info = await transporter.sendMail({
      from: `"성우니티" <${myEmail}>`,
      to: user.email,
      subject: "Reset Password by 성우니티",
      html: `<b>초기화 비밀번호 : ${randomPassword}</b>`,
    });
    console.log(info.messageId);

    res.json({ result: "이메일을 전송했습니다." });
  })
);

const randomPw = () => {
  console.log("[debug]: randomPw");

  return Math.floor(Math.random() * 10 ** 8)
    .toString()
    .padStart("0", 8); //난수 생성 메서드
};

//비밀번호 해쉬화 함수 작성
const passwordHash = (password) => {
  console.log("[debug]: passwordHash");
  const sha1 = crypto.createHash("sha1");
  return sha1.update(password).digest("hex");
};

module.exports = router;
