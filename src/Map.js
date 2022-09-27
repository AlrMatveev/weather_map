/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";

function Map({ startCoords, setCoords }) {
  const [size, resize] = useState([window.innerWidth, window.innerHeight]);
  const [loading, setLoading] = useState(true);
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    loadScript(
      "https://api-maps.yandex.ru/2.1/?apikey=94416829-d281-4d3e-b355-d2d6104e163a&lang=ru_RU",
      init
    );

    function loadScript(src, callback) {
      if (document.getElementById("maploag")) return;
      let script = document.createElement("script");
      script.id = "maploag";
      script.src = src;
      script.onload = () => callback(script);
      document.head.append(script);
    }

    window.addEventListener("resize", () => {
      resize([window.innerWidth, window.innerHeight]);
    });

    const controls = size[0] < 500 ? ["zoomControl"] : [];

    function init() {
      myMap.innerHTML = "";
      ymaps.ready(function () {
        setLoading(false);
        var map = new ymaps.Map("myMap", {
          center: startCoords,
          zoom: 5,
          type: "yandex#hybrid",
          controls: controls,
        });

        dispatch(fetchWeather(map.getCenter()));

        // Отключаем ненужные методы
        map.behaviors.disable("rightMouseButtonMagnifier");
        map.behaviors.disable("dblClickZoom");
        //map.behaviors.disable("scrollZoom");
        map.behaviors.disable("multiTouch");

        // // Создаем метку
        // var placemark = new ymaps.Placemark(
        //   startCoords,
        //   {},
        //   {
        //     // Задаем стиль метки (метка в виде круга).
        //     preset: "islands#circleDotIcon",
        //     // Задаем цвет метки (в формате RGB).
        //     iconColor: "#777777",
        //   }
        // );
        // map.geoObjects.add(placemark);

        // // Перемещаем метку
        // map.events.add("actiontick", function (e) {
        //   var current_state = map.action.getCurrentState();
        //   var geoCenter = map.options
        //     .get("projection")
        //     .fromGlobalPixels(
        //       current_state.globalPixelCenter,
        //       current_state.zoom
        //     );
        //   placemark.geometry.setCoordinates(geoCenter);
        // });

        // Получаем координаты центра
        map.events.add(
          "boundschange",
          function (e) {
            dispatch(fetchWeather(map.getCenter()));
            setCoords(map.getCenter());
          },
          map
        );
      });
    }
  }, []);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={loading}
        timeout={1000}
        classNames="map_transition"
        unmountOnExit
      >
        <div ref={nodeRef} className="map_loader_box"></div>
      </CSSTransition>
      <div id="myMap" style={{ width: size[0], height: size[1] }}></div>
    </>
  );
}

export default Map;
