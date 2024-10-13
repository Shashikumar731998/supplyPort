import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/inputs";
import { PhoneInput } from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useForm, Controller } from "react-hook-form";
import "react-international-phone/style.css";
import logo from "../../assets/images/supplogo.svg";
import arrow from "../../assets/images/arrow-square-left.png";
import { AxiosInstance } from "../../config/Axios";
import { MemoryClient } from "../../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { setGlobal } from "../../redux/slices/globalSlice";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, control, watch } = useForm();
  const [phone, setPhone] = useState("");

  const isValidPhone = isPhoneValid(watch("phone"));

  const onSubmitLoginForm = async (data) => {
    if (!isValidPhone) return;

    const params = new URLSearchParams({
      MobileNo: phone,
      ProfileId: "00000093_Live",
      PortalPassword: "",
    });

    const Axios = new AxiosInstance({ setAuthHeader: false });
    try {
      const { data: responseData } = await Axios.fetch("verifyCustLogin?" + params.toString());
      let response = responseData[0];
      MemoryClient.set("lp", response?.Headers['auth-token']);

      // Dispatch user info
      const PartyName = response?.PartyData[0]?.data[0]?.PartyName || "Guest";
      const address = response?.PartyData[0]?.data[0]?.PerAdd1 || "No address found";
      dispatch(setUser({ PartyName, address }));
      dispatch(setGlobal({ isLoading: false, isLoggedIn: true }));

      navigate("/otp");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login_area">
      <div className="w-full">
        <div className=" grid grid-cols-2 justify-content-center">
          <div className="col-span-1 p-0">
            <div className="login_left sign_in_left">
              <div className="login-content">
                <img src={logo} className="login-logo mb-4" alt="Logo" />
                <h2 className="blue">ELEVATE YOUR <br /> <span>BUSINESS</span></h2>
                <p>Industry through an understanding of the inner workings of The industry</p>
              </div>
            </div>
          </div>
          <div className="col-span-1  h-full w-full items-center d-flex text-left p-20">
            <div className="w-full ">
            <Link to="#" className="go-home"><img src={arrow}></img> Back to Home</Link>
              <div className="signintext">
            <h1 className="dark-blue text-5xl">Sign In</h1>
              <p className="my-2">Please enter your details to Continue.</p>
              </div>
              <form className="sign_in_form" onSubmit={handleSubmit(onSubmitLoginForm)}>
                <label htmlFor="phone">Mobile No.</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="in"
                      placeholder="Enter mobile"
                      onChange={(value, e) => {
                        let pattern = new RegExp(e.country.dialCode);
                        let numberwithoutCountryCode = value.replace(pattern, "").substring(1);
                        setPhone(numberwithoutCountryCode);
                        field.onChange(value);
                      }}
                    />
                  )}
                />
                <Link to="#">Need Help?</Link>
                <button type="submit" className="btn mt-4" disabled={!isValidPhone}>
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
