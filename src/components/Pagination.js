import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(7),
    },
  },
}));

const PaginationOutlined = ({ pageCount, gotoPage, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const classes = useStyles();

  const handleChange = (event, value) => {
    setCurrentPage(value);
    gotoPage(value, pageSize);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount ? pageCount : 1}
        variant="outlined"
        color="primary"
        size="large"
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationOutlined;
