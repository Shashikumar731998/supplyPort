import React from "react";
import "./style.css";

function Timeline({step1Color , step2Color , step3Color}) {
    console.log(step2Color , step3Color , step1Color)
  return (
    <>
      <div className="timeline-outer">
        <div className="step text-center">
          <p className={`step-p ${step1Color === 'true' ? 'colored' : 'trans'}`}>1</p>
          <span className={` ${step1Color === 'true' ? 'colored-font' : 'trans-font'}`}>Cart</span>
        </div>
        <div>
          <div className={`line ${step2Color === 'true' ? 'colored' : 'trans'}`}></div>
        </div>
        <div className="step text-center">
          <p className={`step-p ${step2Color === 'true' ? 'colored' : 'trans'}`}>2</p>
          <span className={`step-p ${step2Color === 'true' ? 'colored-font' : 'trans-font'}`}>Checkout</span>
        </div>
        <div className="scnd-line">
          <div className={`line ${step3Color === 'true' ? 'colored' : 'trans'}`}></div>
        </div>
        <div className="step text-center">
          <p className={`step-p ${step3Color === 'true' ? 'colored' : 'trans'}`}>3</p>
          <span className={`step-p ${step3Color === 'true' ? 'colored-font' : 'trans-font'}`}> Order Placed</span>
        </div>
      </div>
    </>
  );
}

export default Timeline;
