import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  setCartItems,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import del_img from "../../assets/images/delivery.png";
import cartImg from "../../assets/images/red-cart.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

// Utility function to truncate product name
const truncateProductName = (name) => {
  const words = name?.split(" ");
  if (words?.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }
  return name;
};

function Cart() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Redux store from localStorage
    const savedItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedItems) {
      dispatch(setCartItems(savedItems));
    }
  }, [dispatch]);

  useEffect(() => {
    // Update localStorage whenever the cart items change
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const decrementCount = (id) => {
    const item = items.find((item) => item.id === id);
    if (item.quantity > 1) {
      dispatch(decrementQuantity(id));
    } else {
      // Optionally, confirm before removing the item
      dispatch(removeItem(id));
      toast.info("Item removed from cart.");
    }
  };

  const incrementCount = (id) => {
    const item = items.find((item) => item.id === id);
    if (item.quantity < 20) {
      dispatch(incrementQuantity(id));
    } else {
      toast.error("The maximum number of items allowed is 20.");
    }
  };

  const removeItemFromCart = (id) => {
    dispatch(removeItem(id));
    toast.info("Item removed from cart.");
  };

  const CartNotification = () => (
    <div className="cart-notification">
      <img src={del_img} alt="Delivery" />
      <h5>Complete this order & get it delivered in 30 mins.</h5>
    </div>
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const totalPayable = subtotal + tax;

  return (
    <>
      <Navbar />
      <section className="bg-[#FAFBFF] h-full md:px-[100px]">
        <div className="container mb-3">
          <h2 className="font-bold text-2xl">Your Cart</h2>
        </div>
        <div className="container outer-lf">
          <div className="cart-left">
            <div className="cart-outer">
              <div className="cart-headers border-b cart-grid">
                <h5>Products</h5>
                <h5 className="text-center">Quantity</h5>
                <h5 className="text-center">Amount</h5>
                <h5 className="text-center"></h5>
              </div>

              {items.length === 0 ? (
                <div className="empty-cart mt-4">
                  <h5>Your cart is empty!</h5>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id}>
                    {/* If you have categories, you can display category headers here */}
                    {/* <div className="prod-category pd-rl">
                      <h5>{item.category || 'Uncategorized'}</h5>
                    </div> */}
                    <div className="d-flex w-full items-center justify-between cart-padding">
                      <div className="d-flex items-center gap-x-2 cartTitel">
                        <img
                          className="cartImage"
                          src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item.id}.PNG`}
                          alt={item.title}
                          onError={(e) => {
                            e.target.src =
                              "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
                          }}
                        />
                        <span>{truncateProductName(item.title)}</span>
                      </div>
                      <div className="qty-selector d-flex justify-content-center ">
                        <div className="qty-border">
                          <button
                            className="bg-white"
                            onClick={() => decrementCount(item.id)}
                          >
                            -
                          </button>
                          <input
                            className="bg-white text-center"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="bg-white"
                            onClick={() => incrementCount(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-prod-price">
                        <p className="mb-0 text-center">
                          <i className="fal fa-rupee-sign"></i>{" "}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-center">+5 % tax</p>
                      </div>
                      <div className="remove-itms">
                        <button
                          className="h-a bg-white px-2 py-1"
                          onClick={() => removeItemFromCart(item.id)}
                        >
                          <i className="fal fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="cart-right">
            <div className="cart-price white-card">
              <h4 className="text-xl font-bold pb-1">Price Details</h4>
              <hr />
              <div className="cart-pricing my-3 items-center">
                <h5 className=" text-base ">Subtotal</h5>
                <p className="text-end mb-0">
                  <i className="fal fa-rupee-sign"></i> {subtotal.toFixed(2)}
                </p>
              </div>
              <div className="gst">
                <h5 className="mb-0">GST + Cess</h5>
                <p className="text-end mb-0">
                  <i className="fal fa-rupee-sign"></i> {tax.toFixed(2)}
                </p>
                <span className="grey-p">Delivery Charges </span>
                <span className="text-end grey-p">free</span>
              </div>
              <hr />
              <div className="cart-total my-2">
                <h5 className="mb-0">Total Payable</h5>
                <div className="text-end">
                  <p className="text-end mb-0">
                    <i className="fal fa-rupee-sign"></i>{" "}
                    {totalPayable.toFixed(2)}
                  </p>
                  <span className="text-end grey-p">Inc. of taxes</span>
                </div>
              </div>
              <hr />
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
              <p className="red-txt mt-2 text-center flex items-center justify-center">
                <img src={cartImg} alt="Cart" style={{ width: "20px" }} />
                <span
                  onClick={() => navigate("/category")}
                  style={{ cursor: "pointer" }}
                >
                  Continue Shopping
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default Cart;