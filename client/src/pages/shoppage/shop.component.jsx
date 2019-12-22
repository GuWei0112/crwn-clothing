import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollecitonStartAsync } from "../../redux/shop/shop.action";

//import CollectionOverViewContainer from "../../components/collections-overview/collections-overview.container";
//import collectionContainer from "../../pages/collection/collection.container";
import Spinner from "../../components/spinner/spinner.components";
const CollectionOverViewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const collectionContainer = lazy(() =>
  import("../../pages/collection/collection.container")
);

const mapDispatchToProps = dispatch => ({
  fetchCollecitonStartAsync: () => dispatch(fetchCollecitonStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(({ match, fetchCollecitonStartAsync }) => {
  useEffect(() => {
    fetchCollecitonStartAsync();
  }, [fetchCollecitonStartAsync]);

  return (
    <div className="shop-page">
      <Suspense callback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverViewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={collectionContainer}
        />
      </Suspense>
    </div>
  );
});
