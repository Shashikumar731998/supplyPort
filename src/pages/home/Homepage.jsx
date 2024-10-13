import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main_banner from "../../assets/images/home-banner-graphic.png";
import { Navbar } from "../../components/Navbar";
import PreviousPurchaseItem from "./PreviousPurchaseGrid/PreviousPurchaseItem";
import CategoryGrid from "./categoryGrid/CategoryGrid";
import BrandGrid from "./BrandGrid/BrandGrid";
import ProductSlider from "../../components/ProductSlider";
import CartModal from "../../components/CartModal";
import Credits from "../../components/Credits";
import CreditsGrid from "./CreditsGrid/CreditsGrid";

import "./style.css";
import { MemoryClient } from "../../utils";

const Homepage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const token = MemoryClient.get("lp");
  const HomeBanner = ({ imgSrc }) => {
    return (
      <div className="main_banner">
        <div className=" container">
          <div className="row">
            <div className="col-md-6 banner-left">
              <h1 className="banner-head">
                BULK ORDERS <span>Made Easy</span>
              </h1>
              <p>
                A serivce orientation that goes the extra mile to deliver
                results
              </p>
            </div>
            <div className="col-md-6 banner-right">
              <img src={imgSrc} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      // Check if the product already exists in the cart
      const existingProductIndex = prev.findIndex(
        (item) => item.ItemId === product.ItemId
      );

      // If the product exists, increase the quantity
      if (existingProductIndex !== -1) {
        return prev.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product does not exist, add it to the cart with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.ItemId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCartItems((prev) => prev.filter((item) => item.ItemId !== productId));
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    setIsCartOpen(false);
  };

  return (
    <>
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} />
      <HomeBanner imgSrc={main_banner} />
      {/* <Credits /> */}
      <CreditsGrid />
      <ProductSlider
        token={token}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <PreviousPurchaseItem onUpdateQuantity={handleUpdateQuantity} />
      <CategoryGrid />
      <BrandGrid />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onGoToCart={handleGoToCart}
      />
    </>
  );
};

export default Homepage;
