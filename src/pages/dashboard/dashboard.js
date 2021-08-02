import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles, withStyles } from "@material-ui/styles";
import Loader from "../../components/Loader";
import Box from "@material-ui/core/Box";
import WeatherCard from "../../components/WeatherCard";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useDispatch, useSelector } from "react-redux";
import { handleRequest } from "../../redux/actions/actionCreator";
import * as types from "../../redux/actions";
import PaginationOutlined from "../../components/Pagination";
import Chart from "../../components/Chart";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
  },
  chart: {
    minWidth: "30%",
    minHeight: "30%",
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

  const handleChange = (event) => {
    setSelectedTemp(event.target.value);
  };

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
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.root} display="flex" flexDirection="column">
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
              m={3}
            >
              <PaginationOutlined
                pageCount={Math.ceil(
                  weatherSelector.weatherList.length / limit
                )}
                gotoPage={handlePageChange}
                pageSize={limit}
              />
            </Box>
            <Box display="flex" alignSelf="center" p={2} my={5}>
              {weatherSelector.weatherList.map((weather, index) => (
                <WeatherCard
                  data={weatherSelector.data}
                  id={index + 1}
                  weatherInfo={weatherSelector.weatherList}
                  tempType={selectedTemp}
                />
              ))}
            </Box>
            <Box
              display="flex"
              alignSelf="center"
              m={2}
              className={classes.chart}
            >
              <Chart />
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
