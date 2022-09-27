function WeatherInfo({ name, info, icon }) {
  const className = "weather_info_" + name;
  return (
    <div className={"weather_info " + className}>
      <div>{icon}</div>
      <div>{info}</div>
    </div>
  );
}

export default WeatherInfo;
