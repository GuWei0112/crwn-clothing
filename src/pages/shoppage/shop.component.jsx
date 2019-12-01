import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverView from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { fetchCollecitonStartAsync } from "../../redux/shop/shop.action";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollecitonStartAsync: () => dispatch(fetchCollecitonStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ match, isCollectionsFetching, fetchCollecitonStartAsync }) => {
  let unsubscribeFromSnapshot = null;

  useEffect(() => {
    unsubscribeFromSnapshot = fetchCollecitonStartAsync();

    return () => {
      unsubscribeFromSnapshot();
    }; /*ComponentWillUnMount */
  }, [unsubscribeFromSnapshot]);
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionsOverViewWithSpinner
            isLoading={isCollectionsFetching}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={props => (
          <CollectionPageWithSpinner
            isLoading={isCollectionsFetching}
            {...props}
          />
        )}
      />
    </div>
  );
});
