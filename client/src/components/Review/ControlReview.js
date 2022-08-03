import { useEffect } from "react";
const ControlReview = (props) => {
  const { curUserData, onClickDelBtn, onClickUpBtn, item, onClickMoreInfoBtn } =
    props;
  useEffect(() => {
    console.log(item.author?.email); // ?를 사용하지 않으면 item.author이 들어오기 전에 password를 지정추출하여, undefined를 반환. / ?를 사용하면 값을 기다림
  }, []);
  return curUserData?.email === item.author?.email ? (
    <div className="btn-group">
      <button
        onClick={() => {
          onClickMoreInfoBtn(item.shortId);
        }}
        type="button"
        className="btn btn-sm btn-outline-secondary"
      >
        더보기
      </button>
      <button
        onClick={() => {
          onClickUpBtn(item.shortId);
        }}
        type="button"
        className="btn btn-sm btn-outline-secondary"
      >
        수정
      </button>
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        onClick={() => {
          onClickDelBtn(item.shortId);
        }}
      >
        삭제
      </button>
    </div>
  ) : (
    <div className="btn-group">
      <button
        onClick={() => {
          onClickMoreInfoBtn(item.shortId);
        }}
        type="button"
        className="btn btn-sm btn-outline-secondary"
      >
        더보기
      </button>
    </div>
  );
};

export default ControlReview;
