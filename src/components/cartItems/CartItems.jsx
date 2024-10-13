// import React from "react";
// import { useSelector } from "react-redux";
// import { selectCartItems } from "../../redux/slices/cartSlice";
// import "./style.css";

// function ItemsInCart({ cartHeading, showQTY_AMT, orderHd }) {
//   // const items = useSelector(selectCartItems);
//   const items = JSON.parse(localStorage.getItem("recentOrderDetails"));
//   return (
//     <div className="cart-outer">
//       {orderHd === "true" && (
//         <span className="orderhd text-2xl font-semibold ">Order Details</span>
//       )}
//       {/* <div className="cart-headers cart-grid pd-rl">
//         <h5 className="">{cartHeading}</h5>
//         {showQTY_AMT === 'true' && <h5 className="text-center">Quantity</h5>}
//         {showQTY_AMT === 'true' && <h5 className="text-center">Amount</h5>}
//       </div> */}

//       {items.map((item) => (
//         <div key={item.id} className="mt-2">
//           <div className="prod-category pd-rl">
//             <h5>{item.category || "Uncategorized"}</h5>
//           </div>
//           <div className=" grid grid-cols-3">
//             <div className="cart-prod-title">
//               <img
//                 className="cartImage"
//                 src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item?.id}.PNG`}
//                 alt="product"
//                 onError={(e) => {
//                   e.target.src =
//                     "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
//                 }}
//               />{" "}
//               {item.title}
//             </div>
//             {showQTY_AMT === "true" && (
//               <div className="qty-selector d-flex justify-content-center">
//                 <div className="qty-border">
//                   <input type="text" value={item.quantity ?? 1} readOnly />
//                 </div>
//               </div>
//             )}
//             {showQTY_AMT === "true" && (
//               <div className="cart-prod-price">
//                 <p className="mb-0 text-center">{item.price}</p>
//                 <p className="text-center">+5 % tax</p>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ItemsInCart;


import React from "react";
import "./style.css";

function ItemsInCart({ cartHeading, showQTY_AMT, orderHd }) {
  const items = JSON.parse(localStorage.getItem("recentOrderDetails")) || []; // Fallback to an empty array if null

  return (
    <div className="cart-outer">
      {orderHd === "true" && (
        <span></span>
      )}

      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="mt-2">
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
              Qty :  <input type="text" value={item.quantity ?? 1} readOnly /> Nos.
                  </div>
                  <p>Unit Price : {item.price}</p>
                  <p>Tax(%) : +5 % tax</p>
                </div>
              </div>
            {/* <div className="prod-category pd-rl">
              <h5>{item.category || "Uncategorized"}</h5>
            </div> */}
            {/* <div className=" grid grid-cols-3">
              <div className="cart-prod-title">
                
                {item.title}
              </div>
              {showQTY_AMT === "true" && (
                <div className="qty-selector d-flex justify-content-center">
                  
                </div>
              )}
              {showQTY_AMT === "true" && (
                <div className="cart-prod-price">
                  
                  <p className="text-center">+5 % tax</p>
                </div>
              )}
            </div> */}
          </div>
        ))
      ) : (
        <p className="text-center">No items in the cart.</p>
      )}
    </div>
  );
}

export default ItemsInCart;

