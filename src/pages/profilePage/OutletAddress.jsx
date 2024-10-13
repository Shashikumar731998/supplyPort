import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/Axios";
import { FaLocationDot } from "react-icons/fa6";
import location from "../../assets/images/location.png";


const OutletAddress = () => {
  const [partydata, setPartydata] = useState("");
  useEffect(() => {
    const params = new URLSearchParams({
      MobileNo: "8010247949",
      ProfileId: "00000093_Live",
      PortalPassword: "",
    });
    const Axios = new AxiosInstance({ setAuthHeader: false });

    fetch(
      "https://staging.ireckoner.com:4005/master/verifyCustLogin?" +
        params.toString()
    )
      .then((data) => data.json())
      .then((data) => {
        let response = data;
        console.log(response, "res==");
        console.log(response[0]?.PartyData[0]?.data[0], "resddddd==");
        setPartydata(response[0]?.PartyData[0]?.data[0]);
      });
  }, []);

  return (
    <>
      <div className="border-top mt-4 p-4 border-bottom  OutletAddress-wrap">
        <h6 className="text-xl mb-4">Outlet Address</h6>
        {partydata ? (
        <div className="d-flex">
          <div className="d-flex m-2 OutletAddress">
            <div className="location-icon">
              <img src={location} alt="location" />
            </div>
            <div>
              
              <h4>New Storage House</h4>
              <p>{partydata?.PerAdd1}</p>
            </div>
          </div>
          <div className="d-flex m-2  OutletAddress">
            <div className="location-icon">
            <img src={location} alt="location" />
            </div>
            <div>
            <h4>New Storage House</h4>
              <p>{partydata?.PerAdd2}</p>
            </div>
          </div>
        </div>
    
    ) : (
                <p>Loading...</p>
            )}
              </div>
    </>
  );
};

export default OutletAddress;
