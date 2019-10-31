import { Link } from "react-router-dom";
import React from "react";
import classes from "./PageNotFound.module.scss";
import utilClasses from "../../Util/Util.module.scss";

const PageNotFound = props => {
  return (
    <div className={classes.PageNotFound}>
      <h1
        className={utilClasses.Primary__Heading}
        style={{ color: "#fff", marginTop: "6rem" }}
      >
        Page Not Found
      </h1>
      <Link className={classes.PageNotFound_Link} to="/">
        Go To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
