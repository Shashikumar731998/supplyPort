import React from "react";
import pro from "../assets/images/pro.png";

const Credits = () => {
    return (
        <>
        <section>
            <div className="container slider-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="comman-hadding">
                            <h2>Credits</h2>
                        </div>
                        <div className="Total-Outstanding ">
                            <h5>Total Outstanding </h5>
                            <h2><i className="fal fa-rupee-sign"></i> 9,000</h2>
                            <div className="creditwrap">
                                <div className="credit-box">
                                    <h6><i className="fal fa-rupee-sign"></i> 2,59,850</h6>
                                    <p>Overdue Amount</p>
                                </div>
                                <div className="credit-box">
                                    <p>Overdue <span>69 Days</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <section>
                <div className="container slider-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="comman-hadding">
                                <h2>Previously Purchased Items</h2>
                                <a className="view_all" >View All &nbsp; <i className="fa-solid fa-arrow-right"></i></a>
                            </div>
                            <div className="Previously">
                                <h3>Order ID #170444 <span>14 Aug, 2023</span></h3>
                                <div className="Previously-wrap">
                                    <div className="Previously-box-in">
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                    </div>
                                    <div className="Previously-box-in">
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                    </div>
                                    <div className="Previously-box-in">
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                       <div className="Previously-contant">
                                        <div className="Previously-img">
                                            <img src={pro} alt="product" />
                                        </div>
                                        <h4>Budweiser Non Alcoholic
                                        Beer Bottle 330ml PK 24</h4>
                                       </div>
                                    </div>
                                </div>
                                <div className="Previously-total">
                                    <h4>Total - ₹9,000 <button>Reorder</button></h4>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Credits;