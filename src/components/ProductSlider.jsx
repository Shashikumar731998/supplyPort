import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Axios } from "../config/Axios";
import { SamplePrevArrow, SampleNextArrow } from "./CustomArrow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductSlider = ({ token, onUpdateQuantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newStock, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showControls, setShowControls] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
        StartDate: "2023-06-01 00:00:00",
        EndDate: "2023-07-01 23:59:59",
        PartyId: "1661",
      });

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await Axios.fetch(
          "topSellingItems?" + params.toString(),
          config
        );
        if (response.data[0]?.data) {
          setProductData(response.data[0]?.data);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        if (error.response) {
          setError(
            error.response.data.message || "API responded with an error"
          );
        } else if (error.request) {
          setError("No response from the server or network error");
        } else {
          setError(error.message || "An error occurred while fetching data");
        }
      }
    };

    fetchData();

    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const controls = {};
    savedCartItems.forEach((item) => {
      controls[item.id] = true;
    });
    setCartItems(savedCartItems);
    setShowControls(controls);
  }, [token]);

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

  const handleUpdateQuantity = (productId, newQuantity, type) => {
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

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Update state to trigger re-render
    setCartItems(updatedCartItems);

    // Call the provided update function
    onUpdateQuantity(productId, newQuantity);

    if (type == "decrement") {
      dispatch(decrementQuantity(updatedCartItems[productIndex]));
    } else {
      dispatch(incrementQuantity(updatedCartItems[productIndex]));
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!newStock) {
    return <div>Loading...</div>;
  }

  const renderProductItem = (product) => {
    const quantity =
      cartItems.find((item) => item.id === product.ItemId)?.quantity || 0;
    const controlsVisible = showControls[product.ItemId] || false;

    return (
      <div key={product.ItemId} className="product-item">
        <img
          src={`http://service.ireckoner.com:9898/00000093/Images/Item_${product.ItemId}.PNG`}
          alt={product.ItemName}
          onError={(e) => {
            e.target.src =
              "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
          }}
        />
        <p className="pd_desc">{product.ItemName}</p>
        <p className="pd_price">
          <i className="fal fa-rupee-sign"></i> {product.SalesPrice}
        </p>
        {!controlsVisible ? (
          <button
            className="add-item-btn"
            onClick={() => handleAddItem(product)}
          >
            Add Item +
          </button>
        ) : (
          <div className="quantity-controls">
            <button
              onClick={() =>
                handleUpdateQuantity(product.ItemId, quantity - 1, "decrement")
              }
            >
              -
            </button>
            <input
              type="text"
              value={quantity || ""}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (!isNaN(newQuantity)) {
                  if (newQuantity > 20) {
                    toast.error("The maximum number of items allowed is 20.");
                    handleUpdateQuantity(product.ItemId, 20, "increment");
                  } else {
                    handleUpdateQuantity(
                      product.ItemId,
                      newQuantity,
                      "increment"
                    );
                  }
                } else if (e.target.value === "") {
                  handleUpdateQuantity(product.ItemId, 0, "increment");
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
                if (quantity >= 20) {
                  toast.error("The maximum number of items allowed is 20.");
                } else {
                  handleUpdateQuantity(
                    product.ItemId,
                    Math.min(quantity + 1, 20),
                    "increment"
                  );
                }
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="container slider-container">
        <div className="row product-slider">
          <div className="col-md-12">
            <div className="comman-hadding">
              <h2>Trending Products</h2>
              <a className="view_all" onClick={() => navigate("/category")}>
                View All &nbsp; <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <Slider {...settings}>{newStock.map(renderProductItem)}</Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
