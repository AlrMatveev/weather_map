import { useState } from "react";
import Map from "./Map";
import Weather from "./Weather";

function App() {
  const startCoords = [55.76, 37.64];
  const [coords, setCoords] = useState(startCoords);
  return (
    <>
      <Weather coords={coords} />
      <Map startCoords={startCoords} setCoords={setCoords} />
    </>
  );
}

export default App;
