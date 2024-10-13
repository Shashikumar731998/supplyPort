import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import arrow from "../assets/images/arrow-square-left.png";
import logo from "../assets/images/supplyport-w.png";

const Otp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const onSubmit = (data) => {
    console.log('Submitted OTP:', data);
    navigate("/");
  };
  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) { // Allow only single digits or empty value
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setValue(`otp${index}`, value); // Set value for react-hook-form
      if (value && index < 5) { // Move to next input if available
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="login_area">
      <div className="w-full">
        <div className="grid grid-cols-2 justify-content-center">
          <div className="col-span-1 p-0">
            <div className="login_left sign_in_left otp_left">
              <div className="login-content">
                <img src={logo} className="login-logo mb-4" alt="Logo" />
              </div>
            </div>
          </div>
          <div className="col-span-1 h-full w-full items-center d-flex text-left p-20">
            <div className="w-90">
              <Link to="#" className="go-home">
                <img src={arrow} alt="Back" /> Back to Home
              </Link>
              <div className="signintext">
                <h1 className="dark-blue text-5xl">Enter OTP</h1>
                <p className="my-2">OTP sent to your registered number</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="sign_in_form">
                <div className="otp-wrap">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      name={`otp${index}`}
                      {...register(`otp${index}`, {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]$/,
                          message: "Please enter a single digit",
                        },
                      })}
                      value={otpValues[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                {Object.keys(errors).length > 0 && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid 6-digit OTP</p>
                )}
                <p className="need-help">
                  <Link to="#">00:59</Link>
                </p>
                <p className="text-center resend-otp">
                  Did not receive? <Link to="#">Resend OTP</Link>
                </p>
                <button type="submit" className="btn mt-4">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
