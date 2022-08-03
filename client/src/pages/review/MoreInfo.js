import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import backUrl from "./../../data/port.json";

const MoreInfo = () => {
  const params = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [moreInfoData, setMoreInfoData] = useState({});

  useEffect(() => {
    console.log(params); // params 값 확인
    findMoreInfoData()
      .then((res) => {
        setMoreInfoData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const findMoreInfoData = async () => {
    return await axios.get(backUrl.url + `/posts/${params.id}/find`, {
      headers: {
        accessToken: cookies.userData.accessToken,
      },
    });
  };
  return (
    <div className="album">
      <div className="container">
        <h3 style={{}} className="mb-5">
          Detail Page
        </h3>
        <div className="" style={{ marginBottom: "10em", textAlign: "center" }}>
          <div className="d-flex">
            <img style={{ width: "20%" }} src={moreInfoData.img} alt="..." />
          </div>
          <div className="card-body">
            <p className="card-text"></p>
          </div>
        </div>

        <div className="mb-5">
          <h3 htmlFor="title" className="form-label ">
            Title
          </h3>
          <div className="">
            <p className="card-body">{moreInfoData.title}</p>
          </div>
        </div>
        <div className="mb-3">
          <h3 htmlFor="content" className="form-label">
            Content
          </h3>
          <div className="">
            <p className="card-body">{moreInfoData.content}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("직전 페이지로 이동하시겠습니까?")) {
                window.history.back();
              } else {
                //아니오
                return;
              }
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
