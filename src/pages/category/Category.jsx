import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { MemoryClient } from "../../../src/utils";
import { AxiosInstance } from "../../config/Axios";
import { addItem } from "../../redux/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    location.state?.selectedCategory || null
  );
  const [productData, setProductData] = useState([]);
  const [filterLeft, setFilterLeft] = useState([]);
  const [selectedLeftFilterItem, setSelectedLeftFilterItem] = useState(null);
  const [showControls, setShowControls] = useState({});

  const onUpdateQuantity = (productId, newQuantity) => {
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
  useEffect(() => {
    const fetchCategories = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
      });

      const Axios = new AxiosInstance({ setAuthHeader: true });
      try {
        const { data } = await Axios.fetch(
          "getCategoriesWiseItemCount?" + params.toString()
        );
        setFilterLeft(data[0].data);

        if (selectedItem) {
          const defaultCategory = data[0].data.find(
            (category) => category.ItemCategory === selectedItem
          );
          if (defaultCategory) {
            setSelectedLeftFilterItem(data[0].data.indexOf(defaultCategory));
            fetchProducts(selectedItem);
          }
        } else if (data[0].data.length > 0) {
          setSelectedItem(data[0].data[0].ItemCategory);
          setSelectedLeftFilterItem(0);
          fetchProducts(data[0].data[0].ItemCategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const controls = {};
    savedCartItems.forEach((item) => {
      controls[item.id] = true;
    });
    setCartItems(savedCartItems);
    setShowControls(controls);
  }, [selectedItem]);

  const fetchProducts = async (category) => {
    const authToken = MemoryClient.get("lp");
    const params = new URLSearchParams({
      ProfileId: "00000093_Live",
      QueryName: "getItemsDetails",
      UserId: "sa",
      QueryCond: `SubCategory='${category}'`,
    });

    const Axios = new AxiosInstance({ setAuthHeader: true });
    try {
      const { data } = await Axios.fetch(
        "getItemsDetails?" + params.toString(),
        {
          headers: { "auth-token": authToken },
        }
      );
      setProductData(data[0].data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleItemClick = (index) => {
    const category = filterLeft[index]?.ItemCategory;
    setSelectedItem(category);
    fetchProducts(category);
  };

  const filterLeftClickHandler = (index) => {
    const category = filterLeft[index]?.ItemCategory;
    setSelectedLeftFilterItem(index);
    fetchProducts(category);
  };

  const handleProductClick = (itemId) => {
    navigate(`/productpage/${itemId}`);
  };

  const handleAddItem = (item) => {
    const updatedCartItems = [...cartItems];
    const existingProduct = updatedCartItems.find(
      (cartItem) => cartItem.id === item.ItemId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCartItems.push({
        id: item.ItemId,
        title: item.ItemName,
        price: item.SalesPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setShowControls({ ...showControls, [item.ItemId]: true });

    dispatch(
      addItem({
        id: item.ItemId,
        title: item.ItemName,
        price: item.SalesPrice,
        quantity: 1,
      })
    );
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
    <div className="category">
      <Navbar />
      <section>
        <div className="container">
          <div className="">
            <div className="searchbar">
              <i className="fal fa-search"></i>
              <input type="text" placeholder="" />
              <button>Search</button>
            </div>
            <div className="products-filter">
              <div className="filter-left">
                <ul>
                  {filterLeft.map((item, index) => (
                    <li
                      key={index}
                      className={
                        selectedLeftFilterItem === index
                          ? "left-selected-filter"
                          : ""
                      }
                      onClick={() => filterLeftClickHandler(index)}
                      style={{
                        backgroundColor:
                          selectedLeftFilterItem === index
                            ? "#f2f7fa"
                            : "transparent",
                      }}
                    >
                      {item?.ItemCategory}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <div className="product-list">
                  <div className="row">
                    {productData && productData.length > 0 ? (
                      productData.map((item, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="product-item">
                            <img
                              src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item.ItemId}.PNG`}
                              alt={item.ItemName}
                              onError={(e) => {
                                e.target.src =
                                  "http://service.ireckoner.com:9898/00000093/Images/default.PNG";
                              }}
                              onClick={() => handleProductClick(item.ItemId)}
                            />
                            <p className="pd_desc">{item.ItemName}</p>
                            <p className="pd_price">
                              <i className="fal fa-rupee-sign"></i>{" "}
                              {item.SalesPrice}
                            </p>
                            {!showControls[item.ItemId] ? (
                              <button onClick={() => handleAddItem(item)}>
                                Add Item +
                              </button>
                            ) : (
                              <div className="quantity-controls">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.ItemId,

                                      cartItems.find(
                                        (cartItem) =>
                                          cartItem.id === item.ItemId
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
                                    const newQuantity = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    if (!isNaN(newQuantity)) {
                                      if (newQuantity > 20) {
                                        toast.error(
                                          "The maximum number of items allowed is 20."
                                        );
                                        handleUpdateQuantity(item.ItemId, 20);
                                      } else {
                                        handleUpdateQuantity(
                                          item.ItemId,
                                          newQuantity
                                        );
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
                                        (cartItem) =>
                                          cartItem.id === item.ItemId
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
                        </div>
                      ))
                    ) : (
                      <div className="no-products">
                        No products available in this category.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Category;
