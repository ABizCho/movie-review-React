import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(() => {
    if (cookies.userData === undefined) {
      navigate("/");
    }
  }, [cookies]);

  return (
    <header>
      <div className="collapse bg-dark" id="navbarHeader">
        <div className="container">
          <div className="header-content-container d-flex justify-content-between">
            <div className="">
              <h4 className="text-white">Dev horiz.D</h4>
            </div>
            <div className="">
              <h4 className="text-white">Contact</h4>
              <ul className="list-unstyled ">
                <li>
                  <a href="#" className="text-white">
                    Follow my github
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Like my blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Contact me on email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white">내 정보</h5>
              <span style={{ color: "grey", fontSize: 16 }}>
                {cookies.userData?.name}
              </span>
              {cookies.userData ? (
                <ul className="list-unstyled d-flex mt-3">
                  <li>
                    <button className="btn btn-outline-light">
                      마이페이지
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        removeCookie("userData", { path: "/" });
                        navigate("/");
                      }}
                      className="btn btn-outline-light"
                      style={{ marginBottom: "3%" }}
                    >
                      로그아웃
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="list-unstyled d-flex">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="btn btn-outline-secondary"
                    >
                      로그인
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-outline-secondary"
                    >
                      마이페이지
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="navbar navbar-dark bg-dark shadow-sm border-top">
        <div className="container">
          <a
            href="/review/list"
            className="navbar-brand d-flex align-items-center"
          >
            <strong>Movie Review</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
