import React from "react";
import classes from "./loader.module.css";

export default function loader() {
  return (
    <div className={classes.loaderContainer}>
      <span className={classes.loader}></span>
    </div>
  );
}
