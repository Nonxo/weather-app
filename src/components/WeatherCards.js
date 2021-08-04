import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { handleRequest } from "../redux/actions/actionCreator";
import * as types from "../redux/actions";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    background: "rgba(88, 170, 255, 0.5)",
    border: "none",
    borderRadius: "15px",
    marginRight: "30px",
    marginTop: "10px",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.2)",
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.5)",
    },
    "&:focus": {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)",
    },
  },
  active: {
    background: "rgba(0, 0, 0, 0.2)",
    boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 14,
    color: "#fff",
    textShadow: "2px 2px 2px rgba(150, 150, 150, 0.5)",
  },
  text: {
    color: "#fff",
    textShadow: "2px 2px 2px rgba(150, 150, 150, 0.7)",
  },
  icon: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

const WeatherCards = ({ tempType }) => {
  const weatherSelector = useSelector((state) => state.Weather);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  const classes = useStyles();

  // Format date to human readable
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toDateString();
  };

  // Dispatch action to fetch weather by date with 3hours interval
  const displayForecastPerHour = (index) => {
    setSelectedIndex(index);
    dispatch(
      handleRequest(types.FETCH_WEATHER_BY_DATE, {
        start: index,
        end: index + 8,
      })
    );
  };

  return (
    <React.Fragment>
      {!weatherSelector.loading &&
        weatherSelector.weatherPerPage.map((weatherInfo, index) => (
          <React.Fragment key={index + 1}>
            <Card
              className={
                selectedIndex === index
                  ? `${classes.root} ${classes.active}`
                  : classes.root
              }
              variant="outlined"
              onClick={() => displayForecastPerHour(index)}
            >
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  {weatherSelector.data.city.name},{" "}
                  {weatherSelector.data.city.country}
                </Typography>
                {tempType === "imperial" && (
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{
                      color: "#fff",
                      textShadow: "2px 2px 2px rgba(150, 150, 150, 0.5)",
                    }}
                  >
                    {Math.round(weatherInfo.main.temp) + "°F"}
                  </Typography>
                )}
                {tempType === "metric" && (
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.text}
                  >
                    {Math.round(weatherInfo.main.temp) + "°C"}
                  </Typography>
                )}
                <img
                  className={classes.icon}
                  src={`http://openweathermap.org/img/w/${weatherInfo?.weather[0].icon}.png`}
                  height={40}
                  width={40}
                  alt={`${weatherInfo?.weather[0].main}`}
                />
                <Typography
                  variant="body2"
                  component="div"
                  display="inline"
                  className={classes.text}
                >
                  {weatherInfo.weather[0].description} <br />
                  {formatDate(weatherInfo.dt_txt)}
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default WeatherCards;
