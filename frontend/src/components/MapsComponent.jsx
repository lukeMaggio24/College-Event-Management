import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "30vh",
};

function MapsComponent({
  locationPickBool,
  longitude,
  latitude,
  setLng,
  setLat,
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({ lat: 28.6024, lng: -81.2001 });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (locationPickBool) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("setting maps center to current location");
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log("error getting location, check location permissions");
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    }
  }, [locationPickBool, latitude, longitude]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMapClick = useCallback(
    (event) => {
      if (locationPickBool) {
        setMarker({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
        setLng(event.latLng.lng());
        setLat(event.latLng.lat());
      }
    },
    [locationPickBool]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapsComponent);
