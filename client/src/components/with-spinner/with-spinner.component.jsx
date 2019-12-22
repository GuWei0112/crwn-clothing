import React from "react";
import Spinner from "../spinner/spinner.components";

export default WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};
