import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollecitonStartAsync } from "../../redux/shop/shop.action";

import CollectionOverViewContainer from "../../components/collections-overview/collections-overview.container";
import collectionContainer from "../../pages/collection/collection.container";

const mapDispatchToProps = dispatch => ({
  fetchCollecitonStartAsync: () => dispatch(fetchCollecitonStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(({ match, fetchCollecitonStartAsync }) => {
  useEffect(() => {
    fetchCollecitonStartAsync();
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
