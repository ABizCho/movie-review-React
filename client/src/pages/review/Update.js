import { useSelector } from "react-redux"; // store에서 특정 값을 지정하여 가져오는 모듈
import backUrl from "./../../data/port.json";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";

const Update = () => {
  // const shortId = useSelector((state) => state.id.value); // 리덕스 store에서 state 요소 특정해서 가져오기 // 새로고침하면 shortId는 initial state에 할당한 초깃값을 가져옴-> useEffect안으로 보내서 이를 예방

  const [shortId, setShortId] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [updateData, setUpdateData] = useState({});

  let getReduxShortId = useSelector((state) => state.id.value); // hook은 다른 훅(ex. useEffect)안에서 호출 금지이므로, useSelector 사용부인 해당 라인만 useEffect의 밖으로 뺐음.

  useEffect(() => {
    console.log(shortId);

    if (getReduxShortId !== "") {
      setShortId(getReduxShortId);
    }

    findGetReviewData()
      .then((res) => {
        console.log(res);
        setUpdateData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const findGetReviewData = async () => {
    return await axios.get(backUrl.url + `/posts/${getReduxShortId}/find`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };

  const onChangeUpdateData = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="album">
      <div className="container">
        <h3 style={{}} className="mb-5">
          Update Page
        </h3>
        <div className="card" style={{ marginBottom: "10em" }}>
          <div className="card-img-top" style={{ textAlign: "center" }}>
            <img src={updateData.img} alt="..." />
          </div>
          <div className="card-body ">
            <h5 className="card-title mb-3">카드 제목</h5>
            <p className="card-text">카드 텍스트 예시 입니다.</p>
            <p className="card-text"></p>
            <input
              defaultValue={""}
              value={updateData.img}
              disabled
              onChange={onChangeUpdateData}
              type="text"
              name="title"
              className="form-control"
              id="title"
              placeholder="사진 url을 입력해 주세요."
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            defaultValue={""}
            onChange={onChangeUpdateData}
            type="text"
            name="title"
            className="form-control"
            value={updateData.title}
            id="title"
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            defaultValue={""}
            onChange={onChangeUpdateData}
            className="form-control"
            value={updateData.content}
            id="content"
            rows="3"
            name="content"
            placeholder="내용을 입력해 주세요"
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: "1%" }}
          >
            수정
          </button>
          <button
            onClick={() => {
              if (window.confirm("직전 페이지로 이동하시겠습니까?")) {
                window.history.back();
              } else {
                //아니오
                return;
              }
            }}
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

export default Update;
