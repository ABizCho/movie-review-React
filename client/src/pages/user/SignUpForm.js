import $ from "jquery";
import axios from "axios";
import port from "./../../data/port.json";
import { useState, useRef } from "react";

const SignUpForm = (props) => {
  const { signUpData, onChangeSignUpData, setSignUpData } = props;
  const [errMsg, setErrMsg] = useState("");

  const onClickSignUpButton = () => {
    if (signUpData.email === "") {
      const errorMsg = "이메일을 입력해주세요";
      alert(errorMsg);
      $("#email").focus();
      setErrMsg(errorMsg);
      return; //onClickLoginButton 이벤트핸들러 자체를 나감
    }

    if (signUpData.password === "") {
      const errorMsg = "비밀번호를 입력해주세요";
      alert(errorMsg);
      setErrMsg(errorMsg);
      $("#password").focus();
      return;
    }
    if (signUpData.rePassword === "") {
      const errorMsg = "재확인 비밀번호를 입력해주세요";
      alert(errorMsg);
      setErrMsg(errorMsg);
      $("#rePassword").focus();
      return;
    }
    if (signUpData.name === "") {
      const errorMsg = "이름을 입력해주세요";
      alert(errorMsg);
      setErrMsg(errorMsg);
      $("#name").focus();
      return;
    }

    if (signUpData.password !== signUpData.rePassword) {
      const errorMsg = "재확인 비밀번호가 일치하지 않습니다.";
      alert(errorMsg);
      setErrMsg(errorMsg);

      setSignUpData({
        ...signUpData,
        password: "",
        rePassword: "",
      });
    }
    sendSignUpData()
      .then((res) => {
        //응답 = promise 객체값 받음: why? : await 비동기는 promise에 기반함.
        console.log(res);
        alert(res.data.result);
        window.location.reload(); // (window=최상위객체=브라우저) -> 웹브라우저 새로고침
      })
      .catch((e) => {
        console.log(e);
      }); // 아래에서 정의한 to 서버, 요청 함수
    //  console.log(sendSignUpData)); // 비동기 await의 결과로 promise 반환됨
  };

  // DB와 요청/응답을 수행한다면 (무조건) 비동기 처리
  //    요청할 url과 보내고싶은 데이터
  const sendSignUpData = async () => {
    return await axios.post(port.url + "/user/signUp", signUpData); //  user/login에 해당하는 node.js 서버에 요청. signInData를 응답하는 서버단의 참조용 데이터로 전송.
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
              value={signUpData.email}
              onChange={onChangeSignUpData}
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
              onChange={onChangeSignUpData}
              value={signUpData.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">
              rePassword
            </label>
            <input
              onChange={onChangeSignUpData}
              value={signUpData.rePassword}
              type="password"
              className="form-control"
              id="rePassword"
              name="rePassword"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={onChangeSignUpData}
              value={signUpData.name}
              type="text"
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="mb-3">
            <p className="text-danger">{errMsg}</p>
          </div>
          <button
            onClick={() => {
              //해당 이벤트 핸들러 내의 axios 요청(to 서버)를 통해 받은 응답(response)값에 따라 응답 후 처리 로직 정의
              onClickSignUpButton()
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => {
                  alert(e);
                });
            }}
            type="button"
            className="btn btn-primary"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
