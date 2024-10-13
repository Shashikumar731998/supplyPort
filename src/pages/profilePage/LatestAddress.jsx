import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../../config/Axios';
import { FaLocationDot } from 'react-icons/fa6';
import Filters from "../../assets/images/Filters.svg";
import AllOrderCam from "../../components/all-order";

const LatestAddress = () => {
  const [orderData, setOrderData] = useState(null);
  const [activeTab, setActiveTab] = useState('latest');

  useEffect(() => {
    const fetchCategories = async () => {
      const params = new URLSearchParams({
        ProfileId: '00000093_Live',
        PartyId: '3604',
      });
      const Axios = new AxiosInstance({ setAuthHeader: true });
      try {
        const response = await Axios.fetch(
          'https://staging.ireckoner.com:4005/transaction/getOrdersDetail?' +
          params.toString()
        );
        console.log('API response:', response.data); // Log the entire response
        if (response.data && response.data[0]) {
          setOrderData(response.data[0].data);
        } else {
          console.log('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'latest':
        return (
          <div>
            {/* {orderData && orderData.length > 0 ? (
              <table className='table'>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order, index) => (
                    <tr key={index}>
                      <td>{order.OrderID}</td>
                      <td>{order.Name}</td>
                      <td>{order.Total}</td>
                      <td>{order.Date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available</p>
            )} */}
          </div>
        );
      case 'pending':
        return <div>Pending orders content</div>;
      case 'completed':
        return <div>Completed orders content</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <section>
        <div className="container slider-container">
          <div className="row">
            <div className="col-md-12">
              <div className="comman-hadding">
                <h2>Latest Transaction</h2>
              </div>
              <div className='three-tab'>
                <ul className="flex border-b">
                  <li className={`mr-1 ${activeTab === 'latest' ? 'border-b-2' : ''}`}>
                    <a className="bg-white inline-block py-2 px-4" 
                       onClick={() => setActiveTab('latest')}
                       href="#latest">All</a>
                  </li>
                  {/* <li className={`mr-1 ${activeTab === 'pending' ? 'border-b-2' : ''}`}>
                    <a className="bg-white inline-block py-2 px-4"
                       onClick={() => setActiveTab('pending')}
                       href="#pending">Sent</a>
                  </li> */}
                  {/* <li className={`mr-1 ${activeTab === 'completed' ? 'border-b-2' : ''}`}>
                    <a className="bg-white inline-block py-2 px-4"
                       onClick={() => setActiveTab('completed')}
                       href="#completed">Received</a>
                  </li> */}
                </ul>
              </div>
              <div className="tab-content mt-4">
                {/* <div className="flex justify-between items-center mb-4 order-filter order-filter2">
                  <input type="text" placeholder="Search" />
                  <button className="">
                    <img src="/src/assets/images/Filters.svg" alt="Filters" /> Filter
                  </button>
                </div> */}
                {renderTabContent()}
                <AllOrderCam />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestAddress;
