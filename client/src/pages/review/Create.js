import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";
import backUrl from "./../../data/port.json";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const [createReview, setCreateReview] = useState({
    img: "",
    title: "",
    content: "",
    email: cookies.userData.email, // adderEmail로 바꾸면 500에러뜸
  });

  const onClickCreateReviewButton = () => {
    if (createReview.img === "") {
      alert("이미지 경로를 입력해주세요.");
      $("#img").focus();
      return;
    }

    if (createReview.title === "") {
      alert("제목을 입력해주세요.");
      $("#title").focus();
      return;
    }

    if (createReview.content === "") {
      alert("내용을 입력해주세요.");
      $("#content").focus();
      return;
    }

    sendCreateReview()
      .then((res) => {
        console.log(res.data.result);
        alert("정상 등록 되었습니다.");
        navigate("/review/list");
      })
      .catch((e) => {
        console.log(e, "에바입니다.");
      });
  };

  //서버에 요청 로직 (백엔드와 소통 == 비동기: async/await은 프로미스의 응용 -> 호출부에서 then/catch로 후속처리 로직)
  const sendCreateReview = async () => {
    return await axios.post(backUrl.url + "/posts", createReview, {
      headers: {
        //axios의 헤더 작성법
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onClickBackPage = () => {
    if (window.confirm("직전 페이지로 이동하시겠습니까?")) {
      window.history.back();
    } else {
      //아니오
      return;
    }
  };

  useEffect(() => {
    console.log(createReview);
  }, [createReview]); // 쿠키 정상동작 확인 : deps를 []로 설정하면, 첫 렌더링 시에만 수행

  const onChangeCreateReview = (e) => {
    console.log(e.target.value);
    setCreateReview({
      ...createReview,
      [e.target.name]: e.target.value,
    });
  }; // 정상 입력 확인

  return (
    <div className="album">
      <div className="container">
        <h3 style={{}} className="mb-5">
          Create Page
        </h3>
        <div
          className="card"
          style={{ marginBottom: "10em", textAlign: "center" }}
        >
          <div className="card-img-top">
            {createReview.img !== "" ? (
              <img src={createReview.img} alt="movie img" />
            ) : (
              <></>
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title mb-3">카드 제목</h5>
            <p className="card-text">카드 텍스트 예시 입니다.</p>
            <p className="card-text"></p>
            <input
              onChange={onChangeCreateReview}
              type="text"
              name="img"
              className="form-control"
              id="img"
              placeholder="사진 url을 입력해 주세요."
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onChangeCreateReview}
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            onChange={onChangeCreateReview}
            className="form-control"
            id="content"
            rows="3"
            name="content"
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={onClickCreateReviewButton}
            type="button"
            className="btn btn-primary"
            style={{ marginRight: "1%" }}
          >
            등록
          </button>
          <button
            onClick={onClickBackPage}
            type="button"
            className="btn btn-danger"
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
