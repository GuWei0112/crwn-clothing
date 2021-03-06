import React from "react";
import { connect } from "react-redux";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./collection-item.style.scss";
import { addItem } from "../../redux/cart/cart.action";

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        inverted
        onClick={() => addItem(item)}
        className="custom-button"
      >
        Add to Cart
      </CustomButton>
    </div>
  );
});
