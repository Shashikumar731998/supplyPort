import React from "react";
import "./style.css";

import location from "../../../assets/images/location-icon.png";
import { useNavigate } from "react-router-dom";

function ShippingAddress() {

  const navigate = useNavigate();

  return (
    <div className="address-div d-flex">
      <div className="address-left">
        <p className="fw-600 mb-2">Your Order will be Delivered to this Address</p>
        <div className="location d-flex">
          <div>
            <img src={location} />
          </div>
          <div>
            <p className="fw-600 mb-0">New Storage House</p>
            <span className="grey-txt">Sector 5 , New Delhi , India 12345 India (Kawade Wasti)</span>
          </div>
        </div>
      </div>
      <div className="address-right">
        <p className="fw-600 mb-2">Placed an order for the wrong outlet ?</p>
        <span className="grey-txt">Select a different outlet here</span> <br />
        <button onClick={ () => navigate('/selectoutlet') }>Change Outlet</button>
      </div>
    </div>
  );
}

export default ShippingAddress;
