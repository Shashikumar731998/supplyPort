import React, { useEffect, useState } from 'react';
import pd_img from '../../../assets/images/Shape.jpg';
import water from '../../../assets/images/water.jpg'; // Update this path with your actual image path
import { useNavigate } from "react-router-dom";
import { MemoryClient } from "../../../utils";
import { AxiosInstance } from '../../../config/Axios';

// const categories = [
//   { id: 1, name: 'Animal Products' },
//   { id: 2, name: 'Category 2' },
//   { id: 3, name: 'Category 3' },
//   { id: 4, name: 'Animal Products' },
//   { id: 5, name: 'Category 2' },
//   { id: 6, name: 'Category 3' },
//   { id: 7, name: 'Category 3' },  
//   { id: 8, name: 'Category 3' },
// ];

function BrandGrid() {

  const navigate = useNavigate();
  const [categoryData, setData] = useState(null);

  useEffect(() => {
    const token = MemoryClient.get("lp");
    const fetchData = async () => {
      const params = new URLSearchParams({
        // MobileNo: phone,
        ProfileId: "00000093_Live",
        // PortalPassword: "",
      });


      const Axios = new AxiosInstance({ setAuthHeader: true });
      Axios.fetch("getBrandWiseItemCount?" + params.toString()).then(({ data }) => {
        // handleContinue();
        let response = data
        console.log(response[0].data,"brand Data");
        setData(response[0].data)
        const categoryData = response[0].data
        // dispatch(setGlobal({ isLoading: false, isLoggedIn: true }));
        // navigate("/");
      });
    };

    fetchData();
  }, []);



  return (
    <section className="pd_area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="comman-hadding">
            <h2 className='tranding-heading'>Popular brand</h2>
            <a className="view_all" onClick={() => navigate('/category')}>
              View All
              &nbsp; <i className="fa-solid fa-arrow-right"></i>
            </a>
            </div>
          </div>
        </div>
        <div className="row">
          {categoryData &&categoryData.slice(0, 8).map(brand => (
            <div className="col-md-3" key={brand.NoOfItems ?? ""}>
              <div className="Popular-items">
                <a href="#">
                  {/* <img src={water} alt={`Category ${brand.NoOfItems ?? 1}`} /> */}
                  <img
                      src={`http://service.ireckoner.com:9898/00000093/Images/Brand_${brand.Brand}.PNG`}
                      alt={brand.pd_name}
                      onError={(e) => { e.target.src = "http://service.ireckoner.com:9898/00000093/Images/default.PNG"; }}
                    />
                    <div className='brand-name'>
                  <h6>{brand.Brand ?? ""}</h6>
                  <p>No. of Products: {brand.NoOfItems ?? ""}</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandGrid;
