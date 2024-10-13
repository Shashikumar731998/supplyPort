import React from 'react';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onGoToCart }) => {
  if (!isOpen) return null;

  const totalAmount = Object.values(cartItems).reduce((total, item) => total + (item.quantity * item.SalesPrice), 0).toFixed(2);

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        {Object.values(cartItems).map((item) => (
          <div key={item.ItemId} className="cart-item">
            <img
              src={`http://service.ireckoner.com:9898/00000093/Images/Item_${item.ItemId}.PNG`}
              alt={item.ItemName}
              onError={(e) => { e.target.src = "http://service.ireckoner.com:9898/00000093/Images/default.PNG"; }}
            />
            <div className="item-details">
              <h3>{item.ItemName}</h3>
              <p>Price: ₹{item.SalesPrice}</p>
              <div className="quantity-controls">
                <button onClick={() => onUpdateQuantity(item.ItemId, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.ItemId, item.quantity + 1)}>+</button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-total">
          <h3>Total: ₹{totalAmount}</h3>
        </div>
        <button className="go-to-cart-button" onClick={onGoToCart}>
          Go to Cart
        </button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartModal;