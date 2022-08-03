import $ from "jquery";
import axios from "axios";
import port from "./../../data/port.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

const SignInForm = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  const { signInData, onChangeSignInData } = props;

  const navigate = useNavigate(); //navigate 함수객체
  const [errMsg, setErrMsg] = useState("");

  // DB와 요청/응답을 수행한다면 (무조건) 비동기 처리
  const onClickLoginButton = () => {
    if (signInData.email === "") {
      alert("이메일을 입력해주세요");
      $("#email").focus();
      return; //onClickLoginButton 이벤트핸들러 자체를 나감
    }

    if (signInData.password === "") {
      alert("비밀번호를 입력해주세요");
      $("#password").focus();
      return;
    }

    sendSignInData()
      .then((res) => {
        console.log(res);
        //userData라는 쿠키에 res.data를 넣고 '전역경로'로 쿠키 적용
        setCookie("userData", res.data, { path: "/" });
        setTimeout(() => {
          console.log(cookies.userData); //(issue-1-1) 전역에서 쿠키를 가져오는 로직이 비동기이기 때문에, setTimeout등의 비동기 처리를 해주지 않을 시, 해당 쿠키 접근보다 review/list로의 이동이 먼저 일어날 수 있음.
        }, 5000);
        alert("로그인 되었습니다.");
        navigate("/review/list"); //(issue-1-2) 해당 페이지에선 쿠키를 쓰겠다는 선언을 해두지 않았으므로, 해당 패쓰로 넘어간 이후로는 쿠키에 접근할 수 없음.
        //(issue-1-3) 따라서, issue1-1의 console.log는 cookie에 접근할 수 없어지므로, setTimeout 처리 없이는, 'undefined'를 반환함
      })
      .catch((e) => {
        console.log(e);
        setErrMsg(e.response.data.fail);
      })
      .finally(() => {
        console.log(cookies.userData);
      });
    // 요청할 url과 보내고싶은 데이터
  };

  const sendSignInData = async () => {
    return await axios.post(port.url + "/user/login", signInData); //  user/login에 해당하는 node.js 서버에 요청. signInData를 응답하는 서버단의 참조용 데이터로 전송.
  };

  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              value={signInData.email}
              onChange={onChangeSignInData}
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={onChangeSignInData}
              value={signInData.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>

          <div className="mb-3">
            <p className="text-danger">{errMsg}</p>
          </div>

          <button
            onClick={onClickLoginButton}
            type="button"
            className="btn btn-primary"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
