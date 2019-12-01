import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import "./header.style.scss";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";
const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/" className="logo-container">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer className="options">
      <OptionLink to="/shop" className="option">
        SHOP
      </OptionLink>
      <OptionLink to="/shop" className="option">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as="div"  onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin" className="option">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {!hidden && <CartDropDown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps, null)(Header);
