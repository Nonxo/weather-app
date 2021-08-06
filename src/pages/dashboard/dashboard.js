import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import Loader from "../../components/Loader";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useDispatch, useSelector } from "react-redux";
import { handleRequest } from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions";
import PaginationOutlined from "../../components/Pagination";
import Chart from "../../components/Chart";
import WeatherCards from "../../components/WeatherCards";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  chart: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const CustomRadio = withStyles({
  root: {
    color: "#041126",
    "&$checked": {
      color: "#092654",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const Dashboard = () => {
  const weatherSelector = useSelector((state) => state.Weather);
  const [selectedTemp, setSelectedTemp] = useState("imperial");
  const dispatch = useDispatch();
  const classes = useStyles();
  const limit = 3;

  // Handle Temperature unit change
  const handleChange = (event) => {
    setSelectedTemp(event.target.value);
  };

  // Fetch all weather data
  const fetchWeatherData = () => {
    dispatch(handleRequest(types.FETCH_WEATHER_DATA, selectedTemp));
  };

  // Handle page changes
  const handlePageChange = (page, size) => {
    const start = (page - 1) * size;
    const end = page * size;
    dispatch(
      handleRequest(types.FETCH_WEATHER_PAGINATION, {
        start,
        end,
      })
    );
  };

  useEffect(() => {
    fetchWeatherData();
  }, [selectedTemp]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        {weatherSelector.loading ? (
          <Box my="auto" mx="auto">
            <Loader />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              m={3}
            >
              <FormControlLabel
                value="end"
                control={
                  <CustomRadio
                    checked={selectedTemp === "metric"}
                    onChange={handleChange}
                    value="metric"
                    name="temp_celsius"
                    inputProps={{ "aria-label": "Celsius" }}
                  />
                }
                label="Celsius"
              />
              <FormControlLabel
                value="end"
                control={
                  <CustomRadio
                    checked={selectedTemp === "imperial"}
                    onChange={handleChange}
                    value="imperial"
                    name="temp_fahrenheit"
                    inputProps={{ "aria-label": "Fahrenheit" }}
                  />
                }
                label="Fahrenheit"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              my="auto"
            >
              <PaginationOutlined
                pageCount={Math.ceil(weatherSelector.total / limit)}
                gotoPage={handlePageChange}
                pageSize={limit}
              />
            </Box>
            <Box
              component="div"
              display="flex"
              flexDirection="row"
              p={2}
              my={5}
              mx="auto"
              overflow="visible"
            >
              <WeatherCards tempType={selectedTemp} />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              mx="auto"
              className={classes.chart}
            >
              <Chart />
            </Box>
          </Box>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
