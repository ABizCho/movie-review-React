const { Router } = require("express");
const { Post } = require("./../models/");
const { User } = require("./../models/");

const asyncHandler = require("../utils/async-handler");
const router = Router();

//게시글 작성 : 2번
//게시글이 작성되면 post형식의
// '/posts/' 에 해당하는 url이 라우팅되어 접근
router.post("/", async (req, res, next) => {
  const { title, content, email, img } = req.body;
  //formData에서 req.body를 통해 들어온 title, content를 가져옴
  try {
    const authData = await User.findOne({ email });
    //Post에 해당하는 스키마에 create 함수를 실행하고,
    //title과 content를 넣음.
    await Post.create({
      title,
      content,
      img,
      author: authData,
      email: email,
    });

    //에러가 나지 않고 정상적으로 저장이 되면
    //응답을 json 형태로 보내줍니다.
    res.json({
      result: "저장이 완료되었습니다.",
    });
  } catch (e) {
    //에러가 발생 할 경우, 오류 처리 미들웨어로 넘겨줍니다.
    next(e);
  }
});

//게시글 리스트 : 2번
//게시글 리스트를 가져오기 위해 '/posts/'를 get방식으로 라우팅 되어 접근하게 됩니다.
router.get("/", async (req, res, next) => {
  //Post스키마에 해당되는 document들을 find (전부 가져옴)
  const posts = await Post.find({}).populate("author");
  //가져온 데이터를 posts변수에 담아 json 형태로 응답합니다.
  res.json(posts);
});

router.get("/:shortId/delete", async (req, res, next) => {
  const { shortId } = req.params; // param variable 가져오기
  console.log(shortId); //삭제할 id 제대로 가져왔는지 확인
  try {
    //삭제로직

    await Post.deleteOne({ shortId }); // 삭제요청

    res.json({
      result: "삭제가 완료 되었습니다.",
    });
  } catch (e) {
    next(e);
  }
});

////title로 삭제하기
// router.get("/:title/delete", async (req, res, next) => {
//   const { title } = req.params; // param variable 가져오기
//   console.log(title); //삭제할 id 제대로 가져왔는지 확인
//   try {
//     //삭제로직

//     await Post.deleteOne({ title }); // 삭제요청

//     res.json({
//       result: "삭제가 완료 되었습니다.",
//     });
//   } catch (e) {
//     next(e);
//   }
// });

////// 업데이트
router.get("/:shortId/find", async (req, res, next) => {
  let { shortId } = req.params;

  try {
    let data = await Post.findOne({ shortId }); //params로 받은 shortId를 식별자로 몽고DB의 document데이터 식별하여 가져오기

    res.json(data); //json형태로 바꿔서 다시 요청을 보낸 posts/find로 'res'를 응답보냄
  } catch (e) {
    next(e);
  }
});

router.post("/:shortId/update", async (req, res, next) => {
  let { shortId } = req.params; // view/static/js/postUpdate의 ajax요청의 url요청의 success res를 받아 동작
  let { title, content, email } = req.body;

  console.log(shortId, title, content, email); //콘솔로 update 변경내용 확인하기

  try {
    await Post.updateOne(
      { shortId }, //바꿀 기준의 식별값
      {
        //바꿀값
        title: title,
        content: content,
      }
    );

    res.json({
      result: "수정이 완료되었습니다.",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
