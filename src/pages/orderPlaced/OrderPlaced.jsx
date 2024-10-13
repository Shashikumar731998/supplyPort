import React from "react";
import { Navbar } from "../../components/Navbar";
import ItemsInCart from "../../components/cartItems/CartItems";
import Timeline from "../../components/timeline/Timeline";
import { useSelector } from "react-redux";
import location from "../../assets/images/location-icon.png";
import { useNavigate } from "react-router-dom";
import "./style.css";

function OrderPlaced() {
  const navigate = useNavigate();
  const address = useSelector((state) => state.user.address); // Get address from Redux state

  const OrderBox = () => {
    return (
      <div className="whitebg place-outer">
        <div>
          <h5>Order Reserved</h5>
          <p className="grey">Thank you for choosing Supplyport to reserve your order</p>
        </div>
        <div className="btn-cont">
          {/* <button className="transparent-btn">Download Invoice</button> */}
          <button className="clr-btn" onClick={() => navigate('/selectoutlet')}>
            Place Order for other outlet
          </button>
        </div>
      </div>
    );
  };

  const DeliveringAddress = () => {
    return (
      <div className="right-add">
        <h4 className="orderhd text-2xl font-semibold mb-6">Address Delivering</h4>
        <div className="d-flex" style={{ columnGap: "5px" }}>
          <div>
            <img src={location} className="w-10" alt="Location Icon" />
          </div>
          <div>
            <p className="dark-p">New Storage House</p>
            <p className="grey">{address}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="container mb-3">
          <h2>Order Placed</h2>
          <Timeline step1Color="true" step2Color="true" step3Color="true" />
          <OrderBox />
        </div>
        <div className="container outer-lf order-grid">
          <div className="cart-left orderplaceleft">
            <ItemsInCart cartHeading="ORDER#1756468999" showQTY_AMT="false" orderHd="true" />
          </div>
          <div className="cart-right">
            <DeliveringAddress />
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderPlaced;
