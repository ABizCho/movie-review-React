const express = require("express");
const mongoose = require("mongoose");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/user");
const authMiddleware = require("./utils/authMiddleware");

const cors = require("cors"); // cross-origin resource sharing ( 교차출처 리소스 공유 ) 미들웨어
const bodyParser = require("body-parser");

//
PORT = 8080;
MONGO_URI = "mongodb://localhost:27017/myapp";

//
const app = express();

//몽고DB의 URI를 통해 연결
mongoose.connect(MONGO_URI);
//     - 몽고DB 연결관리
mongoose.connection.on("connected", () => {
  console.log("DB connect success");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//app(express 객체=서버)
//아래는 전역경로에 cors 등의 외부 라이브러리로 설치한 미들웨어를 부착해주는 것. default로 전역경로를 잡기 때문에 받게될 모든 url에 각 미들웨어들의 기능을  수행함
app.use("", cors()); //이렇게 특정 경로를 붙이면, 특정 경로에만 미들웨어 기능을 수행함.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

////// 경로 라우팅
// posts url 경로 라우팅
app.use("/posts/", authMiddleware, postsRouter); // authMiddleware를 먼저 거치고 postsRouter로 라우팅됨

// users url 경로 라우팅
app.use("/user", usersRouter); // authMiddleware를 먼저 거치고 postsRouter로 라우팅됨

// 서버 실행
app.listen(8080, () => {
  console.log("server open");
});
