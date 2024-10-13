import { useNavigate } from "react-router-dom";
import { Input, Select } from "../components/inputs.jsx";
import BackToHome from "../components/BackToHome.jsx";

const Signup = () => {
  const navigate = useNavigate();

  const SignUpForm = () => {
    return (
      <form className="signup-form" onSubmit={() => navigate("/submitted")}>
        <Input label="Name" type="text" />
        <Input label="Email" type="email" />
        <Input label="Number" type="number" />

        <Select label="Location">
          <option>Delhi</option>
          <option>Mumbai</option>
        </Select>
        <button className="mt-4" type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="login_area">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-md-6 p-0">
            <div className="sign_left"></div>
          </div>
          <div className="col-md-6 text-right p-0 right-sign">
            <div className="login_right sign_right">
              <div>
                <BackToHome />
              </div>

              <div>
                <h1 className=" dark-blue">Sign Up</h1>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
