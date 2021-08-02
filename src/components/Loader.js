import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: 300,
    backgroundColor: "transparent",
  },
});

const Loader = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
      </div>
    </React.Fragment>
  );
};

export default Loader;
