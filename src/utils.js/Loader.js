import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";

function Loader({ isLoading, children }) {
  const { loaderContainer } = useStyles();

  if(!isLoading) {
    return children
  }
  return (
    <div className={loaderContainer}>
      <CircularProgress style={{ color: "#FF7B00" }} />
    </div>
  );
}

export default Loader;
