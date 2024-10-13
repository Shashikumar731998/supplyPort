import { useNavigate } from "react-router-dom";
import logo from "../assets/images/supplogo.svg";


const Login = () => {

  const navigate = useNavigate()

  return (
    <div className="login_area">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 p-0">
            <div className="login_left">
              <div className="login-content">
                <img src={logo} className="login-logo mb-4" />
                <h2 className="blue">
                  Specialised Support Services For HORECA
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-right p-0">
            <div className="login_right">
              <h1 className="dark-blue">Get Started</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a
                venenatis eros.
              </p>
              <a  className="btn midnight_blue" onClick={ () => navigate('/signup') }>
                Create a new account
              </a>
              <p className="mt-4 mb-4 text-center">
                <strong>Already have an account?</strong>
              </p>
              <a className="btn btn-transparent" onClick={ () => navigate('/signin') }>
                Sign In
              </a>
              <a href="#" className="need_help mt-2">
                Need help?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;















