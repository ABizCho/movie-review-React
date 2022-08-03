import SignInForm from "../pages/user/SignInForm";
import SignUpForm from "../pages/user/SignUpForm";

import { useState, useEffect } from "react";

const Login = () => {
  const [view, setView] = useState({
    signIn: false,
    signUp: false,
  });

  //로그인 입력받을 데이터를 props로 넘겨줌
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
  });

  const onChangeSignInData = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSignUpData = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(signInData);
  }, [signInData]);

  useEffect(() => {
    console.log(signUpData);
  }, [signUpData]);

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">
              리뷰하고 싶은 영화를 추가하고, 별점을 주세요. <br />
              또한 삭제, 수정이 가능합니다.
            </p>
            <p>
              <button
                className="btn btn-primary my-2 m-1"
                onClick={() => {
                  setView({
                    signIn: !view.signIn,
                    signUp: false,
                  });
                }}
              >
                로그인
              </button>
              <button
                className="btn btn-secondary my-2 m-1"
                onClick={() => {
                  setView({
                    signIn: false,
                    signUp: !view.signUp,
                  });
                }}
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </section>
      {view.signIn ? (
        <SignInForm
          signInData={signInData}
          onChangeSignInData={onChangeSignInData}
        />
      ) : (
        <></>
      )}
      {view.signUp ? (
        <SignUpForm
          setSignUpData={setSignUpData}
          signUpData={signUpData}
          onChangeSignUpData={onChangeSignUpData}
        />
      ) : (
        <></>
      )}
    </main>
  );
};

export default Login;
