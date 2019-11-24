import React from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selector";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.style.scss";

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <h2>None in the cart</h2>
      )}
    </div>
    <CustomButton>Go to Checkout</CustomButton>
  </div>
));
