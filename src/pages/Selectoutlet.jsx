import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "../config/Axios";
import { MemoryClient } from "../utils";
import logo from "../assets/images/supplogo.svg";
import outletImgOne from "./images/Frame 1707478583.png";
const SelectOutlet = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = MemoryClient.get("lp");

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const Axios = new AxiosInstance();
        const response = await Axios.fetch(
          "https://staging.ireckoner.com:4005/master/verifyCustLogin?ProfileId=00000093_Live&MobileNo=8010247949&PortalPassword=",
          {
            headers: {
              "auteh-token": authToken,
            },
          }
        ); // Replace with the actual endpoint if necessary
        setOutlets(response.data[0].PartyData[0].data || []);
        console.log("outlets", response.data[0].PartyData);
      } catch (err) {
        console.error("Error fetching outlets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOutlets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="select_area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 p-0 outlet_left">
            <div className="login-content">
              <img src={logo} className="login-logo mb-4" alt="logo" />
              <h2 className="blue">Operational <br/> <span>Efficiency</span></h2>
              <p>Helping restaurants achieve efficiencies in its back end Operations </p>
            </div>
          </div>
          <div className="col-md-6 text-right p-0">
          <a href="/">
          <div className="select_right">
              <div className="select_outlet">
                <h1 className="text-center outlet-heading">Select Outlet</h1>
                <p className="text-center outlet-pera">
                  Select a delivery location
                </p>

                <div className="row outlet-row">
                  {outlets.map((outlet, index) => (
                    <div className="col-6" key={index}>
                      <div className="outlet_item text-center">
                        <div className="outlet_item_head">
                          {/* Replace with a default image or any logic to show images */}
                          <img src={outletImgOne} />
                        </div>
                        <div className="outlet_item_btm">
                          <a href="#" onClick={() => navigate("/")}>
                            <h2>{outlet.PartyName}</h2>
                            <p>
                              {outlet.PerAdd1}, {outlet.PerAdd2}
                            </p>
                            <p>
                              {outlet.PerCity}, {outlet.PerState},{" "}
                              {outlet.PerZip}
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOutlet;
