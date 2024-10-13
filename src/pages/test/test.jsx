// Example usage in a React component
import React, { useEffect, useState } from "react";
import api from "./api";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await api.get("/master/topSellingItems", {
          params: {
            ProfileId: "00000093_Live",
            StartDate: "2023-06-01 00:00:00",
            EndDate: "2023-07-01 23:59:59",
            PartyId: 1661,
          },
        });
        setProducts(response.data[0]?.data || []);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div>
      <h2>Trending Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.ItemId}>
            {product.ItemName} - {product.TotalSale}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingProducts;
