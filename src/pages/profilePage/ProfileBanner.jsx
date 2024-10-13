import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/Axios";
import { useNavigate } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { PiFinnTheHumanBold } from "react-icons/pi";
const ProfileBanner = () => {
  const [partydata, setPartydata] = useState("");
  const navigate = useNavigate();
  console.log(partydata,"partydata")
  useEffect(() => {
    const params = new URLSearchParams({
      MobileNo: "8010247949",
      ProfileId: "00000093_Live",
      PortalPassword: "",
    });
    const Axios = new AxiosInstance({ setAuthHeader: false });
    Axios.fetch("verifyCustLogin?" + params.toString()).then(({ data }) => {
      // handleContinue();
      let response = data[0];
      console.log(response?.PartyData[0]?.data[0], "res==");
      setPartydata(response?.PartyData[0]?.data[0]);
      // MemoryClient.set("lp", response?.Headers['auth-token']);
      // // dispatch(setUser(data.user));
      // dispatch(setGlobal({ isLoading: false, isLoggedIn: true }));
      // navigate("/");
    });
  }, []);

  return (
    <><div className="ProfileBanner relative"></div>
    <div className="d-flex items-center w-100">
      <div className="imgAvtar ">
        <PiFinnTheHumanBold />
      </div>
      <div className="d-flex profileDetails-wrap">
        <div className="profileDetails mx-2 relative -bottom-5 w-100">
          <h6 className="text-xl font-medium">{partydata?.PartyName ?? ""}</h6>
          <p></p>
          <p className="flex gap-2 items-center mt-1">
            <CiPhone />
            {partydata?.PerTelephone ?? ""}
          </p>
          <p className="flex gap-2 items-center mt-1">
          <i class="fal fa-envelope"></i>
            Sam123@gmail.com
          </p>
        </div>
        <button onClick={() => navigate("/selectoutlet")}>Change Outlet</button>
      </div>
    </div></>
  );
};

export default ProfileBanner;
