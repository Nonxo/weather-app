import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 200,
    background: "rgba(77, 166, 255, 0.7)",
    marginRight: "30px",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.2)",
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.5)",
      cursor: "pointer",
    },
    "&:focus": {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)",
    },
  },
  title: {
    fontSize: 14,
    color: "#fff",
  },
  pos: {
    marginBottom: 12,
    color: "#fff",
  },
});

const WeatherCard = ({ id, weatherInfo, data, tempType }) => {
  const classes = useStyles();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <React.Fragment>
      {weatherInfo && (
        <Card key={id} className={classes.root}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              {data.name}, {data.country}
            </Typography>
            {tempType === "imperial" && (
              <Typography variant="h5" component="h2" style={{ color: "#fff" }}>
                28°C
              </Typography>
            )}
            {tempType === "metric" && (
              <Typography variant="h5" component="h2" style={{ color: "#fff" }}>
                28°C
              </Typography>
            )}
            <Typography className={classes.pos}>adjective</Typography>
            <Typography variant="body2" component="p" style={{ color: "#fff" }}>
              {weatherInfo.main}{" "}
              <img
                src={`http://openweathermap.org/img/w/${weatherInfo?.weather[0].icon}.png`}
              />
              <br />
              {formatDate(weatherInfo.dt)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default WeatherCard;
