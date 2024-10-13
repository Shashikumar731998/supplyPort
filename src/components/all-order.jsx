// import React, { useState, useEffect } from "react";
// import download from "../assets/images/download.png";
// import Back from "../assets/images/Back.png";
// import { AxiosInstance } from "../config/Axios";

// const AllOrderCam = ({ searchQuery }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   console.log("all data get la -------   -----",data);

//   useEffect(() => {
//     const fetchData = async () => {
//       const params = new URLSearchParams({
//         ProfileId: "00000093_Live",
//         PartyId: "1661",
//       });

//       const Axios = new AxiosInstance({ setAuthHeader: true });
//       try {
//         const { data } = await Axios.fetch(
//           "https://staging.ireckoner.com:4005/transaction/getLastOrderDetail?" +
//             params.toString()
//         );
//         let response = data;
//         setData(response[0].data);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const [expandedOrder, setExpandedOrder] = useState(null);

//   const toggleAccordion = (docId) => {
//     setExpandedOrder(expandedOrder === docId ? null : docId);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     const date = new Date(dateString);
//     return date.toLocaleDateString(undefined, options);
//   };

//   const matchesSearchQuery = (order, query) => {
//     if (!query) return true;
//     const lowerQuery = query.toLowerCase();
//     return (
//       order.DocSlNo.toLowerCase().includes(lowerQuery) ||
//       order.PartyName.toLowerCase().includes(lowerQuery) ||
//       order.WarehouseName.toLowerCase().includes(lowerQuery) ||
//       formatDate(order.DocDate).toLowerCase().includes(lowerQuery)
//     );
//   };

//   const filteredData = data
//     ? data.filter((order) => matchesSearchQuery(order, searchQuery))
//     : [];

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="allOrder-table">
//       <table className="min-w-full">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 text-left">Doc ID</th>
//             <th className="py-2 px-4 text-left">Party Name</th>
//             <th className="py-2 px-4 text-left">Warehouse Name</th>
//             <th className="py-2 px-4 text-left">Date</th>
//             <th className="py-2 px-4 text-left">Invoice</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((order) => (
//             <React.Fragment key={order.DocId}>
//               <tr
//                 className={`cursor-pointer ${
//                   expandedOrder === order.DocId ? "active-accordion" : ""
//                 }`}
//                 onClick={() => toggleAccordion(order.DocId)}
//               >
//                 <td className="py-3 px-4">#{order.DocId}</td>
//                 <td className="py-3 px-4">{order.PartyName}</td>
//                 <td className="py-3 px-4">{order.WarehouseName}</td>
//                 <td className="py-3 px-4">{formatDate(order.DocDate)}</td>
//                 <td className="py-3 px-4 d-flex backwrap">
//                   <button>
//                     Download <img src={download} alt="Download" />
//                   </button>
//                   <img src={Back} alt="back" />
//                 </td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllOrderCam;































import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import download from "../assets/images/download.png";
import Back from "../assets/images/Back.png";
import pro from "../assets/images/pro.png";
import { AxiosInstance } from "../config/Axios";

const AllOrderCam = () => {

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    console.log("all data get la -------   -----",data);
  
    useEffect(() => {
      const fetchData = async () => {
        const params = new URLSearchParams({
          ProfileId: "00000093_Live",
          PartyId: "3474",  
          DocNo:"96904"
        });
  
        const Axios = new AxiosInstance({ setAuthHeader: true });
        try {
          const { data } = await Axios.fetch(
            "https://staging.ireckoner.com:4005/transaction/getLastOrderDetail?" +
              params.toString()
          );
          let response = data[0]?.data;
          setData(response);
          setLoading(false);
        } catch (error) {
          setError("Error fetching data");
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);


    // const orders = [
    //     {
    //         id: '17104705643',
    //         outlet: 'Sadar Chowk',
    //         date: '02/08/2023',
    //         totalCost: '₹7500',
    //         products: [
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹260.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },
    //             {
    //                 name: 'Bisleri Mineral Water 1ltr Pk12',
    //                 orderQty: '12 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹270.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹2500.00',
    //                 image: '/water.png',
    //             },
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹300.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },

    //         ],
    //     },
    //     {
    //         id: '17104705644',
    //         outlet: 'Sadar Chowk',
    //         date: '02/08/2023',
    //         totalCost: '₹7500',
    //         products: [
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹260.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },
    //             {
    //                 name: 'Bisleri Mineral Water 1ltr Pk12',
    //                 orderQty: '12 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹270.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹2500.00',
    //                 image: '/water.png',
    //             },
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹300.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },

    //         ],
    //     },
    //     {
    //         id: '17104705645',
    //         outlet: 'Sadar Chowk',
    //         date: '02/08/2023',
    //         totalCost: '₹7500',
    //         products: [
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹260.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },
    //             {
    //                 name: 'Bisleri Mineral Water 1ltr Pk12',
    //                 orderQty: '12 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹270.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹2500.00',
    //                 image: '/water.png',
    //             },
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹300.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },

    //         ],
    //     },
    //     {
    //         id: '17104705646',
    //         outlet: 'Sadar Chowk',
    //         date: '02/08/2023',
    //         totalCost: '₹7500',
    //         products: [
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹260.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },
    //             {
    //                 name: 'Bisleri Mineral Water 1ltr Pk12',
    //                 orderQty: '12 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹270.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹2500.00',
    //                 image: '/water.png',
    //             },
    //             {
    //                 name: 'Budweiser Non Alcoholic Beer Bottle 330ml Pk x 24',
    //                 orderQty: '24 PK',
    //                 shippedQty: '12 PK',
    //                 price: '₹300.00',
    //                 orderAmount: '₹2500.00',
    //                 shippedAmount: '₹1000.00',
    //                 image: '/beer.png',
    //             },

    //         ],
    //     },
    // ];

    const [expandedOrder, setExpandedOrder] = useState();

    // const toggleAccordion = (DocId) => {
    //     setExpandedOrder(DocId);
    //     console.log("DocId",expandedOrder);
    // };
    console.log("DocId",expandedOrder);
    return (

        <div className="allOrder-table">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Outlet</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Total Cost</th>
                        {/* <th className="py-2 px-4 text-left">Invoice</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((order) => (
                        <React.Fragment key={order.DocSlNo}>
                            <tr
                                className={`cursor-pointer ${expandedOrder === order?.ItemId ? 'active-accordion' : ''}`}
                                onClick={() => setExpandedOrder(order?.ItemId)}
                            >
                                <td className="py-3 px-4">#{order.DocSlNo}</td>
                                <td className="py-3 px-4">{order.WarehouseName}</td>
                                <td className="py-3 px-4">{order.DeliveryDate}</td>
                                <td className="py-3 px-4">{order.UnitPrice}</td>
                                {/* <td className="py-3 px-4 d-flex backwrap">
                                    <button>Download <img src={download} alt="Download" /></button><img src={Back} alt="back" />
                                </td> */}
                            </tr>
                            {expandedOrder === order?.ItemId && (
                                <tr>
                                    <td className="py-2 px-4" colSpan="5">
                                       
                                        <div className="Expandable-wrap">
                                            <div className="Product-colam">
                                                <p>Product</p>
                                                <p>Order Qty.</p>
                                                <p>Shipped Qty.</p>
                                                <p>Price</p>
                                                <p>Order  Amount</p>
                                                <p>Shipped  Amount</p>
                                            </div>
                                            <div
                                                        className="Product-colam-text mt-3"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className='Previously-img'>
                                                                <img
                                                                    src={expandedOrder ? `http://service.ireckoner.com:9898/00000093/Images/Item_${order.ItemId}.PNG` : pro} alt="Product Image" />
                                                            </div>
                                                            <div className='ml-3'>
                                                                <p>{order.SubCategory}</p>
                                                            </div>
                                                        </div>
                                                        <p>{order.ItemQty}</p>
                                                        <p> {order.ShipCharges}</p>
                                                        <p>{order.NetRate
                                                        }</p>
                                                        <p>{order.MRP}</p>
                                                        <p>{order.ShipCharges}</p>
                                                    </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllOrderCam





