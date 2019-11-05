import React, { useState } from "react";
import Shop_Data from "./shop.data";
import CollectionPreview from "../../components/preview-collection/preview-collection.component";
export default () => {
  const [collections, setCollection] = useState(Shop_Data);
  return (
    <div>
      {collections.map(({ id, ...OtherCollectionProps }) => (
        <CollectionPreview key={id} {...OtherCollectionProps} />
      ))}
    </div>
  );
};
