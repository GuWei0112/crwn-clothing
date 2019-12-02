import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionStart } from "../../redux/shop/shop.action";

import CollectionOverViewContainer from "../../components/collections-overview/collections-overview.container";
import collectionContainer from "../../pages/collection/collection.container";

const mapDispatchToProps = dispatch => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart())
});

export default connect(
  null,
  mapDispatchToProps
)(({ match, fetchCollectionStart }) => {
  useEffect(() => {
    fetchCollectionStart();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverViewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={collectionContainer}
      />
    </div>
  );
});
