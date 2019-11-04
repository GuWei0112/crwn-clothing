import React, { useState } from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.style.scss'
export default props => {
  const [sections, setSection] = useState([
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvontL1/hat.png",
      id: 1
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      id: 2
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      id: 3
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/hat.png",
      size:'larger',
      id: 4
    },
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/hat.png",
      size:'larger',
      id: 5
    }
  ]);
  return (
    <div className="directory-menu">
      {sections.map(({ id, title, imageUrl,size }) => (
        <MenuItem key={id} title={title} imageUrl ={imageUrl} size={size}/>
      ))}
    </div>
  );
};
