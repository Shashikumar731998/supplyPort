/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addItem } from "../../../redux/slices/cartSlice";
import { AxiosInstance } from "../../../config/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PreviousPurchaseItem({ onUpdateQuantity }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ItemData, setItemData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showControls, setShowControls] = useState({});

  useEffect(() => {
    // Fetching previous purchased items
    const fetchCategories = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
        PartyId: "3604",
      });
      const Axios = new AxiosInstance({ setAuthHeader: true });
      try {
        const { data } = await Axios.fetch(
          "https://staging.ireckoner.com:4005/transaction/getLastOrderDetail?" +
            params.toString()
        );
        setItemData(data[0].data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch previous purchases");
      }
    };

    fetchCategories();

    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);

    // Show controls for items already in cart
    const controls = {};
    savedCartItems.forEach((item) => {
      controls[item.id] = true;
    });
    setShowControls(controls);
  }, []);

  useEffect(() => {
    // Update the controls when cartItems changes
    const controls = {};
    cartItems.forEach((item) => {
      controls[item.id] = true;
    });
    setShowControls(controls);
  }, [cartItems]);

  const handleAddItem = (product) => {
    const updatedCartItems = [...cartItems];
    const existingProduct = updatedCartItems.find(
      (item) => item.id === product.ItemId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCartItems.push({
        id: product.ItemId,
        title: product.ItemName,
        price: product.SalesPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems); // Update state to trigger re-render
    setShowControls((prev) => ({ ...prev, [product.ItemId]: true }));

    // Update Redux state
    dispatch(
      addItem({
        id: product.ItemId,
        title: product.ItemName,
        price: product.SalesPrice,
        quantity: 1,
      })
    );

    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCartItems = [...cartItems];
    const productIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    if (productIndex !== -1) {
      if (newQuantity > 0) {
        updatedCartItems[productIndex].quantity = newQuantity;
      } else {
        // Remove item when quantity is 0 or less
        updatedCartItems.splice(productIndex, 1);
        setShowControls((prev) => ({ ...prev, [productId]: false }));
      }
    }

    console.log(
      updatedCartItems,
      "updatedCartItems",
      newQuantity,
      "newQuantity",
      productId,
      "productId"
    );

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Update state to trigger re-render
    setCartItems(updatedCartItems);

    // Call the provided update function
    onUpdateQuantity(productId, newQuantity);
  };

  return (
    <section className="">
      <div className="container">
        <div className="comman-hadding">
          <h2>Previously Purchased Item</h2>
        </div>
        <div className="PuchaseMainDiv">
          <h3 className="my-3 view_all ml-30">OrderId #{ItemData[0]?.DocId}</h3>
          <div className="">
            <Slider {...settings}>
              {ItemData &&
                ItemData.map((item, index) => (
                  <div key={index} className="product-item">
                    <img
                      src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item.ItemId}.PNG`}
                      alt={item.ItemName}
                      onError={(e) => {
                        e.target.src =
                          "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
                      }}
                    />
                    <p className="pd_desc">{item.ItemName}</p>
                    <p className="pd_price">
                      <i className="fal fa-rupee-sign"></i> {item.SalesPrice}
                    </p>
                    {!showControls[item.ItemId] ? (
                      <button
                        className="add-item-btn"
                        onClick={() => handleAddItem(item)}
                      >
                        Add Item +
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.ItemId,

                              cartItems.find(
                                (cartItem) => cartItem.id === item.ItemId
                              ).quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={
                            cartItems.find(
                              (cartItem) => cartItem.id === item.ItemId
                            )?.quantity || ""
                          }
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            if (!isNaN(newQuantity)) {
                              if (newQuantity > 20) {
                                toast.error(
                                  "The maximum number of items allowed is 20."
                                );
                                handleUpdateQuantity(item.ItemId, 20);
                              } else {
                                handleUpdateQuantity(item.ItemId, newQuantity);
                              }
                            } else if (e.target.value === "") {
                              handleUpdateQuantity(item.ItemId, 0);
                            }
                          }}
                          min="0"
                          max="20"
                          style={{
                            width: "60px",
                            textAlign: "center",
                            outline: "none",
                            background: "#ECF0FD80",
                          }}
                        />
                        <button
                          onClick={() => {
                            const currentQuantity =
                              cartItems.find(
                                (cartItem) => cartItem.id === item.ItemId
                              )?.quantity || 0;
                            if (currentQuantity >= 20) {
                              toast.error(
                                "The maximum number of items allowed is 20."
                              );
                            } else {
                              handleUpdateQuantity(
                                item.ItemId,
                                currentQuantity + 1
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </section>
  );
}

export default PreviousPurchaseItem;
