import React from "react";
import logo from "../assets/images/supplogo.svg";
import submit from "../assets/images/submitgraphic.svg";
import ok from "../assets/images/ok.png";
import BackToHome from "../components/BackToHome";

function FormSubmitted() {
  return (
    <div className="login_area">
      <div className="container-fluid">
        <div className="row justify-content-center align-item">
          <div className="col-md-6 p-0 loginleft-cont">
            <div className="submit_left">
              <div className="login-content">
                <img src={logo} className="login-logo mb-4" />
              </div>
              <img src={submit} className="submit" />
            </div>
          </div>

          <div className="col-md-6 text-right  right-submit">
            <BackToHome />
            <div className="submit-graphic">
              <div>
                <h2>Form Submitted</h2>
                <img src={ok} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSubmitted;
