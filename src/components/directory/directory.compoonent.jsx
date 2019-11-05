import React, { useState } from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.style.scss";
export default props => {
  const [sections, setSection] = useState([
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvontL1/hats.png",
      id: 1,
      linkUrl: ""
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      id: 2,
      linkUrl: ""
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      id: 3,
      linkUrl: ""
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/mens.png",
      size: "larger",
      id: 4,
      linkUrl: ""
    },
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      size: "larger",
      id: 5,
      linkUrl: ""
    }
  ]);
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};
