import Loader from "./Loader";
import WeatherInfo from "./WeatherInfo";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";

import { useRef } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

const icons = {
  temp: <ThermostatIcon />,
  humidity: <WaterIcon />,
  speed: <AirIcon />,
};

function Weather() {
  const weather = useSelector((state) => state.weather);
  const nodeLoader = useRef(null);
  const nodeWeather = useRef(null);

  return (
    <div className="weather_box">
      <CSSTransition
        nodeRef={nodeLoader}
        in={weather.status === "loading"}
        timeout={1000}
        classNames="map_transition"
        unmountOnExit
        mountOnEnter
      >
        <div className="weather_loader" ref={nodeLoader}>
          <Loader />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={nodeWeather}
        in={weather.status === "loaded"}
        timeout={1000}
        classNames="map_transition"
        unmountOnExit
        mountOnEnter
      >
        <div ref={nodeWeather}>
          {Object.entries(weather.data).map((e) => {
            return (
              <WeatherInfo
                key={e[0]}
                name={e[0]}
                info={e[1]}
                icon={icons[e[0]]}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
}

export default Weather;
