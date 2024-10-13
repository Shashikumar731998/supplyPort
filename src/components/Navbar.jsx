import React, { useState, useEffect } from "react";
import logo from "../pages/images/main_logo.png";
import notification from "../assets/images/notification.svg";
import home from "../assets/images/carbon_home.svg";
import profile from "../assets/images/Profile.svg";
import Shopping from "../assets/images/Shopping.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

export const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Pull cartItems and user details from Redux store
  const cartItems = useSelector((state) => state.cart.items); 
  const { PartyName } = useSelector((state) => state?.user);

  useEffect(() => {
    console.log("Navbar cartItems:", cartItems);
    // Calculate total items and price whenever cartItems changes
    if (cartItems.length > 0) {
      const itemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPrice = cartItems
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2);
      setCartItemCount(itemCount);
      setCartTotal(totalPrice);
    } else {
      setCartItemCount(0);
      setCartTotal(0);
    }
  }, [cartItems]); // Ensure this runs when cartItems changes

  return (
    <>
      <div className="header desk-menu">
        <nav className="main-nav">
          <div className="container py-2">
            <div className="row">
              <div className="col-md-3 logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
              <div className="col-md-6 menu-link d-flex justify-content-center align-items-center menuLink">
                <a className="mb-0 cursor-pointer">Inventory</a>
                <p className="mb-0">Staffing</p>
              </div>
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div className="head_logo d-flex">
                  <Link to="/">
                    <img src={home} alt="Home" />
                  </Link>
                  <Link to="/notifications">
                    <img src={notification} alt="Notification" />
                  </Link>
                  <Link to="/profile">
                    <img src={profile} alt="Profile" />
                  </Link>
                  {cartItemCount > 0 && (
                    <Link to="/cart">
                      <div className="cart-summary">
                        {/* <i className="fas fa-shopping-cart"></i> */}
                        <img src={Shopping} alt="Profile" />
                        <span className="cart-item-count">{cartItemCount}</span>
                        <span className="cart-total-price">₹{cartTotal}</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="member_detail w-full px-20 py-2 desk-details">
        <div className="text-center w-full">
          <h5 className="mb-0 navbar-link"> Hi, {PartyName || "Guest"}</h5>
        </div>
      </div>
    </>
  );
};