import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar";
import ProductSlider from "../../components/ProductSlider";
import { AxiosInstance } from '../../config/Axios';
import { addItem } from "../../redux/slices/cartSlice";
import { MemoryClient } from '../../utils';
import "./style.css";

function ProductPage() {
  const navigate = useNavigate();
  const { ItemId } = useParams();
  const [images, setImages] = useState({});
  const [amount, setAmount] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const token = MemoryClient.get("lp");

  useEffect(() => {
    const fetchProductData = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
        UserId: "sa",
        QueryName: "getItemView",
        ItemId: ItemId ?? 1575,
        PartyId: 1034,
        DocumentDate: "2022-10-03 00:00:00"
      });

      try {
        const Axios = new AxiosInstance({ setAuthHeader: true });
        const { data } = await Axios.fetch("getItemView?" + params.toString());
        const productData = data[0].data[0];
        setImages({
          img1: productData.img1 ?? "",
          img2: productData.img2 ?? "",
          img3: productData.img3 ?? "",
          img4: productData.img4 ?? "",
        });
        setProductDetails({
          id: productData.ItemId ?? "",
          title: productData.ItemName ?? "",
          subtext: productData.subtext ?? "",
          price: productData.SalesPrice ?? "",
          MrpPrice: productData.MRP ?? "",
          priceSubtext: productData.priceSubtext ?? "",
          TaxRate: productData.TaxName ?? "",
          description: productData.description ?? "",
        });
        setTotalPrice(productData.SalesPrice);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [ItemId]);

  useEffect(() => {
    if (productDetails.price) {
      setTotalPrice(productDetails.price * amount);
    }
  }, [amount, productDetails.price]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...productDetails, quantity: amount }));
    navigate("/cart");
  };


  const handleAddToCart2 = (product) => {
    setCartItems((prev) => {
      // Check if the product already exists in the cart
      const existingProductIndex = prev.findIndex((item) => item.ItemId === product.ItemId);
      
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
console.log(cartItems,"cartItems")
const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity > 0) {
    setCartItems(prev => 
      prev.map(item =>
        item.ItemId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  } else {
    setCartItems(prev => prev.filter(item => item.ItemId !== productId));
  }
};

  const ProductImages = () => (
    <div className="pd-images">
      <img 
        src={`http://service.ireckoner.com:9898/00000093/Images/Item_${productDetails?.id}.PNG`}
        alt="product"
        onError={(e) => { e.target.src = "http://service.ireckoner.com:9898/00000093/Images/default.PNG"; }}
      />
    </div>
  );

  const ProductDetails = () => {
    const decrementAmount = () => {
      if (amount > 1) setAmount((prev) => prev - 1);
    };

    const incrementAmount = () => {
      setAmount((prev) => prev + 1);
    };

    return (
      <div>
        <h2 className="pd-title">{productDetails.title || 'Loading...'}</h2>
        <span className="pd-price-subtext">{productDetails.TaxRate || 'Loading...'}</span>
        <span className="pd-price-discaunt">{productDetails.Discount || 10}% off</span>
        <h6 className="pd-price"><i class="fal fa-rupee-sign"></i>{totalPrice.toFixed(2) || 'Loading...'}</h6>
        <label className="pd-price-subtext">MRP <i class="fal fa-rupee-sign"></i> {productDetails.MrpPrice || 'Loading...'}</label>
        <div className="atc">
          <span>Quantity</span>
          <div className="quantity-selector">
            <button className="dec" onClick={decrementAmount}>-</button>
            <span className="">{amount}</span>
            <button className="inc" onClick={incrementAmount}>+</button>
          </div>
          <button className="atc-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="pd-container container">
          <ProductImages />
          <ProductDetails />
        </div>
        <ProductSlider 
        token={token}
        cartItems={cartItems}
        onAddToCart={handleAddToCart2}
        onUpdateQuantity={handleUpdateQuantity}
      />
      </section>
    </>
  );
}

export default ProductPage;
