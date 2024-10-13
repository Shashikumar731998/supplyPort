import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import AllOrderCam from "../../components/all-order";
import Filters from "../../assets/images/Filters.svg";

const AllOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar />
      <section>
        <div className="container slider-container">
          <div className="row">
            <div className="col-md-12">
              <div className="comman-hadding">
                <h2>AllOrder</h2>
              </div>
              <div className="flex justify-between items-center mb-4 order-filter">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="">
                  <img src={Filters} alt="Filters" /> Filter
                </button>
              </div>
              <AllOrderCam searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllOrder;
