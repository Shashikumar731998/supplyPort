// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "../../components/Navbar";
// import ShippingAddress from "./shipAddress/ShippingAddress";
// import ItemsInCart from "../../components/cartItems/CartItems";
// import Timeline from "../../components/timeline/Timeline";
// import location from "../../assets/images/location-icon.png";
// import { selectCartItems } from "../../redux/slices/cartSlice";
// import { getUser } from "../../redux/slices/userSlice";
// import cart from "../../assets/images/red-cart.png";

// async function Checkout() {
//   const navigate = useNavigate();
//   const items = useSelector(selectCartItems);
//   const user = useSelector(getUser);

//   const subtotal = items.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const tax = subtotal * 0.05; // Assuming 5% tax
//   const totalPayable = subtotal + tax;

//   const generateOrderId = () => {
//     return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
//   };

//   const handlePlaceOrder = () => {
//     const orderId = generateOrderId();
//     localStorage.setItem(
//       "checkoutData",
//       JSON.stringify({ items, user, totalPayable, subtotal, tax, orderId })
//     );
//     navigate(`/placeorder/${orderId}`);
//   };

//   return (
//     <>
//       <Navbar />
//       <section className="bg-[#FAFBFF] h-full md:px-[100px]">
//         <div className="container mb-3">
//           <h2 className="font-bold text-2xl">Checkout</h2>
//           <Timeline step1Color="true" step2Color="false" step3Color="false" />
//           <div className="user-address my-4">
//             <div className="address-div d-flex">
//               <div className="address-left">
//                 <p className="fw-600 mb-2">
//                   Your Order will be Delivered to this Address
//                 </p>
//                 <div className="location d-flex">
//                   <div>
//                     <img src={location} alt="location" />
//                   </div>
//                   <div>
//                     <p>{user.address}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="address-right">
//                 <p className="fw-600 mb-2">Placed an order for the wrong outlet?</p>
//                 <span className="grey-txt">Select a different outlet here</span>
//                 <br />
//                 <button onClick={() => navigate("/selectoutlet")}>
//                   Change Outlet
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container outer-lf">
//           <div className="cart-left">
//             <div className="cart-outer px-5">
//               <div className="cart-headers border-b cart-grid">
//                 <h5>Products</h5>
//                 <h5 className="text-center">Quantity</h5>
//                 <h5 className="text-center">Amount</h5>
//               </div>
//               {items.length === 0 ? (
//                 <div className="empty-cart mt-4">
//                   <h5>Your cart is empty!</h5>
//                 </div>
//               ) : (
//                 items.map((item) => (
//                   <div key={item.id}>
//                     <div className="prod-category pd-rl">
//                       <h5>{item.category || "Uncategorized"}</h5>
//                     </div>
//                     <div className="d-flex w-full items-center justify-between">
//                       <div className="d-flex items-center gap-x-2">
//                         <img
//                           className="cartImage"
//                           src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item?.id}.PNG`}
//                           alt="product"
//                           onError={(e) => {
//                             e.target.src =
//                               "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
//                           }}
//                         />
//                         {item.title}
//                       </div>
//                       <div className="qty-selector d-flex justify-content-center">
//                         <div className="qty-border">
//                           <input type="text" value={item.quantity} readOnly />
//                         </div>
//                       </div>
//                       <div className="cart-prod-price">
//                         <p className="mb-0 text-center">
//                           {(item.price * item.quantity).toFixed(2)}
//                         </p>
//                         <p className="text-center">+5 % tax</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//           <div className="cart-right">
//             <div className="cart-price white-card">
//               <h4 className="text-xl font-bold pb-1">Price Details</h4>
//               <hr />
//               <div className="cart-pricing my-3 items-center">
//                 <h5 className="text-base">Subtotal</h5>
//                 <p className="text-end mb-0">{subtotal.toFixed(2)}</p>
//               </div>
//               <div className="gst">
//                 <h5 className="mb-0">GST + Cess</h5>
//                 <p className="text-end mb-0">{tax.toFixed(2)}</p>
//                 <span className="grey-p">Delivery Charges</span>
//                 <span className="text-end grey-p">free</span>
//               </div>
//               <hr />
//               <div className="cart-total my-2">
//                 <h5 className="mb-0">Total Payable</h5>
//                 <div className="text-end">
//                   <p className="text-end mb-0">{totalPayable.toFixed(2)}</p>
//                   <span className="text-end grey-p">Inc. of taxes</span>
//                 </div>
//               </div>
//               <hr />
//               <button className="checkout-btn" onClick={handlePlaceOrder}>
//                 Place Order
//               </button>
//               <p className="red-txt mt-2 text-center flex items-center justify-center">
//                 <img src={cart} style={{ width: "20px" }} alt="cart" />
//                 <span onClick={() => navigate("/category")} style={{ cursor: "pointer" }}>
//                   Continue Shopping
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Checkout;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import ShippingAddress from "./shipAddress/ShippingAddress";
import ItemsInCart from "../../components/cartItems/CartItems";
import Timeline from "../../components/timeline/Timeline";
import location from "../../assets/images/location-icon.png";
import { selectCartItems } from "../../redux/slices/cartSlice";
import { getUser } from "../../redux/slices/userSlice";
import cart from "../../assets/images/red-cart.png";

function Checkout() {
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const user = useSelector(getUser);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [outstanding, setOutstanding] = useState(0); // New state for fetched data

  useEffect(() => {
    const subtotalCalc = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const taxCalc = subtotalCalc * 0.05; // Assuming 5% tax
    const totalPayableCalc = subtotalCalc + taxCalc;

    setSubtotal(subtotalCalc);
    setTax(taxCalc);
    setTotalPayable(totalPayableCalc);
  }, [items]);

  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
  };

  const handlePlaceOrder = () => {
    const orderId = generateOrderId();
    localStorage.setItem(
      "checkoutData",
      JSON.stringify({ items, user, totalPayable, subtotal, tax, orderId })
    );
    navigate(`/placeorder/${orderId}`);
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#FAFBFF] h-full md:px-[100px]">
        <div className="container mb-3">
          <h2 className="font-bold text-2xl">Checkout</h2>
          <Timeline step1Color="true" step2Color="false" step3Color="false" />
          <div className="user-address my-4">
            <div className="address-div d-flex">
              <div className="address-left">
                <p className="fw-600 mb-2">
                  Your Order will be Delivered to this Address
                </p>
                <div className="location d-flex mt-3">
                  <div>
                    <img src={location} alt="location" />
                  </div>
                  <div className="OutletAddress p-0 border-0">
                    <h4>New Storage House</h4>
                    <p>{user.address}</p>
                  </div>
                </div>
              </div>
              <div className="address-right">
                <p className="fw-600 ">Placed an order for the wrong outlet?</p>
                <span className="grey-txt">Select a different outlet here</span>
                <br />
                <button onClick={() => navigate("/selectoutlet")}>
                  Change Outlet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container outer-lf">
          <div className="cart-left">
            <div className="cart-outer px-5">
              {/* <div className="grid grid-cols-3 grid-flow-col gap-4">
                <h5>Products</h5>
                <h5 className="text-center">Quantity</h5>
                <h5 className="text-center">Amount</h5>
              </div> */}
              <div class="Order-Details">
                      <h5>Order Details</h5>
                    {/* <p>ORDER #171047005463</p> */}
                    </div>
              {items.length === 0 ? (
                <div className="empty-cart mt-4">
                  <h5>Your cart is empty!</h5>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="">
                   <div className="image-pro-wrap">
                   <div className="pro-images">
                   <img
                          className="cartImage"
                          src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item?.id}.PNG`}
                          alt="product"
                          onError={(e) => {
                            e.target.src =
                              "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
                          }}
                        />
                    </div>
                    <div className="pro-all-data">
                    <h5> {item.title}</h5>
                    <div className="qty-border">
                        Qty : <input
                            className="bg-white"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />Nos.
                        </div>
                        <p>
                        Unit Price : {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p>Tax(%) : +5 % tax</p>
                      </div>
                    </div>


                    {/* <div className="prod-category pd-rl">
                      <h5>{item.category || "Uncategorized"}</h5>
                    </div> */}
                    {/* <div className="grid grid-cols-3 grid-flow-col gap-4 w-full cart-padding">
                      <div className="d-flex w-full items-center gap-x-2">
                        
                        {item.title}
                      </div>
                      <div className="items-center d-flex justify-content-center">
                       
                      </div> */}
                      {/* <div className="">
                        
                      </div> */}
                    {/* </div> */}
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
                <h5 className="text-base">Subtotal</h5>
                <p className="text-end mb-0">{subtotal.toFixed(2)}</p>
              </div>
              <div className="gst">
                <h5 className="mb-0">GST + Cess</h5>
                <p className="text-end mb-0">{tax.toFixed(2)}</p>
                <span className="grey-p">Delivery Charges</span>
                <span className="text-end grey-p">free</span>
              </div>
              <div className="outstanding">
                <h5 className="mb-0">Outstanding</h5>
                <p className="text-end mb-0">{outstanding.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cart-total my-2">
                <h5 className="mb-0">Total Payable</h5>
                <div className="text-end">
                  <p className="text-end mb-0">{totalPayable.toFixed(2)}</p>
                  <span className="text-end grey-p">Inc. of taxes</span>
                </div>
              </div>
              <hr />
              <button className="checkout-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
              <p className="red-txt mt-2 text-center flex items-center justify-center">
                <img src={cart} style={{ width: "20px" }} alt="cart" />
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
    </>
  );
}

export default Checkout;
