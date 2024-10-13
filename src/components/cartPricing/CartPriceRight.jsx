import React from 'react'
import { useNavigate } from 'react-router-dom';


import check from '../../assets/images/green-check.png'
import cart from '../../assets/images/red-cart.png'

import './style.css';

function CartPriceRight({showBottomTexts , showCheckoutBtn , redirectTo}) {

  const navigate = useNavigate();

  return (
    <div className='cart-price white-card'>
      <h4>Price Details</h4> 
      <hr />
      <div className='cart-pricing'>
        <h5 className='mb-0'>Subtotal</h5>
        <p className='text-end mb-0'>24660</p>
        <span className='grey-p'>Product Discount</span>
        <span className='text-end grey-p'>-1120</span>
      </div>
      <div className='gst'>
        <h5 className='mb-0'>GST + Cess</h5>
        <p className='text-end mb-0'>460</p>
        <span className='grey-p'>Delivery Charges </span>
        <span className='text-end grey-p'>free</span>
      </div>
      <hr />
      <div className='cart-total'>
        <h5 className='mb-0'>Total Payable</h5>
        <div className='text-end'>
          <p className='text-end mb-0'>2460</p>
          <span className='text-end grey-p'>Inc. of taxes</span>
        </div>
      </div>
      <hr></hr>
      { showBottomTexts === 'true' && <p className='amt-saved red-txt'> <img src={check} style={{width:'20px'}}/> You saved 1120.25 in this order</p>}
      
      

      { showCheckoutBtn === 'true' &&  <button className='checkout-btn' onClick={ () => navigate(redirectTo) }>Checkout</button>}

      { showBottomTexts === 'true' && <p className='red-txt mt-2 text-center'> <img src={cart} style={{width:'20px'}}/>Continue Shopping </p>}
      
    </div>
  )
}

export default CartPriceRight
