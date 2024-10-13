import React, { useEffect, useState } from "react";
import ItemsInCart from "../../components/cartItems/CartItems";
import CartPriceRight from "../../components/cartPricing/CartPriceRight";
import Timeline from "../../components/timeline/Timeline";
import { Navbar } from "../../components/Navbar";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosInstance } from "../../config/Axios";
import { MemoryClient } from "../../utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

function PlaceOrder() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [checkoutData, setCheckoutData] = useState(null);
  const [data, setData] = useState([]);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const authToken = MemoryClient.get("lp");

  useEffect(() => {
    const fetchOutstanding = async () => {
      try {
        const response = await fetch(
          "https://staging.ireckoner.com:4005/dashboard/getTotalOutstanding?ProfileId=00000093_Live&PartyId=1661&endDate=2023-02-09%2023:59:59",
          {
            headers: {
              "auth-token": authToken,
            },
          }
        );
        const result = await response.json();
        const responseData = result[0].data;
        setData(responseData);

        const sumCredit = parseFloat(responseData["sum(Credit)"]) || 0;
        const sumDebit = parseFloat(responseData["sum(Debit)"]) || 0;

        setTotalOutstanding(sumCredit - sumDebit);
      } catch (error) {
        console.error("Error fetching outstanding data:", error);
      }
    };

    fetchOutstanding();
  }, [authToken]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    setCheckoutData(data);
  }, []);

  const placeOrder = async () => {
    if (!checkoutData) return;

    const { items } = checkoutData;

    const payload = {
      DatasetSave: {
        HEADER: [
          {
            UnitId: "00000001",
            DocId: "30000024",
            DocType: "0000",
            DocNo: 0,
            DocSlNo: "",
            DocDate: new Date().toISOString(),
            PartyId: 1979,
            CurrencyId: "356",
            CurrencyRate: "1.00",
            WarehouseId: "5",
            HeadAttr40: 16787.9131728,
            Status: "1",
            CreatedBy: 1,
            CreatedDate: new Date().toISOString(),
            Modified_By: 1,
            Modified_Date: new Date().toISOString(),
          },
        ],
        DETAIL: items.map((item, index) => ({
          UnitId: "00000001",
          DocId: "30000024",
          DocType: "0000",
          DocNo: 0,
          ItemSeqNo: index + 1,
          ItemId: item.id || 0,
          ItemUOM: "Case",
          ItemQty: item.qty ? item.qty.toString() : "0",
          UnitPrice: item.price ? item.price.toString() : "0.00",
          DiscountPercent: item.discount || 0,
          TaxValue: item.tax || 0,
          NetRate: item.price * (1 - (item.discount || 0) / 100),
          CreatedBy: 1,
          CreatedDate: new Date().toISOString(),
          ModifyBy: 1,
          ModifyDate: new Date().toISOString(),
          TaxCd: "",
        })),
      },
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": authToken,
      };

      const response = await axios.post(
        "https://staging.ireckoner.com:4005/transaction/saveDocument?ProfileId=00000093_Live&DocumentAction=1",
        {
          ...payload,
        },
        {
          headers,
        }
      );
      console.log("Order placed successfully:", response.data);
      // Clear the cart after successful order
      localStorage.setItem("recentOrderDetails", JSON.stringify(items));
      dispatch(clearCart());

      navigate("/orderplaced");
    } catch (error) {
      console.log(error, "error");
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const PlaceOrderBox = () => {
    return (
      <div className="whitebg place-outer">
        <div>
          <p className="due-notif red-clr">
            Your payment will be due on Aug 26
          </p>
          <p>
            Your current outstanding credit amount is{" "}
            <span className="red-clr">{totalOutstanding.toFixed(2)}</span>
          </p>
        </div>
        <div className="btn-cont">
          <button className="clr-btn" onClick={placeOrder}>
            Place Order
          </button>
          <button className="transparent-btn">Cancel</button>
        </div>
      </div>
    );
  };

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  const { items, totalPayable, subtotal, tax } = checkoutData;

  return (
    <>
      <Navbar />
      <section>
        <div className="container mb-3">
          <h2>Checkout</h2>
          <Timeline step1Color="true" step2Color="true" step3Color="false" />
          <PlaceOrderBox />
        </div>
        <div className="container outer-lf">
          <div className="cart-left placeorderleft">
            <div className="order-details white-card p-4 mb-4">
            <div class="Order-Details">
            <h5>Order Details</h5>
            <p>ORDER {orderId}</p>
            </div>
              <ItemsInCart items={items} showQTY_AMT="true" orderHd="true" />
            </div>
          </div>
          <div className="cart-right">
            <div className="cart-price white-card p-4">
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
              <hr />
              <div className="cart-total my-2">
                <h5 className="mb-0">Total Payable</h5>
                <div className="text-end">
                  <p className="text-end mb-0">{totalPayable.toFixed(2)}</p>
                  <span className="text-end grey-p">Inc. of taxes</span>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlaceOrder;
