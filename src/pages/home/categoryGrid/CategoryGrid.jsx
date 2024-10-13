import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MemoryClient } from "../../../utils";
import { AxiosInstance } from '../../../config/Axios';

function CategoryGrid() {
  const navigate = useNavigate();
  const [categoryData, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        ProfileId: "00000093_Live",
      });

      const Axios = new AxiosInstance({ setAuthHeader: true });
      Axios.fetch("getCategoriesWiseItemCount?" + params.toString()).then(({ data }) => {
        setData(data[0].data);
      });
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category`, { state: { selectedCategory: category.ItemCategory } });
  };

  return (
    <section className="pd_area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="comman-hadding">
            <h2>Popular category</h2>
            <a className="view_all" onClick={() => navigate('/category')}>
              View All
              &nbsp; <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          </div>
        </div>
        <div className="row">
          {categoryData && categoryData.slice(0, 8).map(category => (
            <div className="col-md-3" key={category.NoOfItems ?? ""}>
              <div className="Popular-items">
                <a onClick={() => handleCategoryClick(category)}>
                  <img
                    src={`http://service.ireckoner.com:9898/00000093/Images/Category_${category.ItemCategory}.PNG`}
                    alt={category.ItemCategory}
                    onError={(e) => { e.target.src = "http://service.ireckoner.com:9898/00000093/Images/default.PNG"; }}
                  />
                  <h6>{category.ItemCategory ?? ""}</h6>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
