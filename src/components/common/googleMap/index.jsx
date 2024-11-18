import React, { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import { handleRequest } from "../../../helpers/helpers";
import "leaflet/dist/leaflet.css";

const GoogleMap = () => {
  const [location, setLocation] = useState(null);
  const [storeLocation, setStoreLocation] = useState(null);
  const [previousCaravanLocation, setPreviousCaravanLocation] = useState(null);
  const [currentCravanLocation, setCurrentCaravanLocation] = useState(null);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const res = await handleRequest("get", "/map/location");
      if (res.data.success) {
        const data = res.data.data;
        // lat: 31.503673, lng: 74.331678 
        setStoreLocation({lat: data.shop_lat, lng:data.shop_lng});
        setPreviousCaravanLocation({lat: data.pre_caravan_lat, lng: data.pre_caravan_lng});
        setCurrentCaravanLocation({lat: data.current_caravan_lat, lng: data.current_caravan_lng})
        setLocation(res.data.data);
      }
    } catch (err) {
      console.log(err, "err==>");
    }
  };

  // Define the custom marker icon
  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  return (
    <>
      {storeLocation && (
        <MapContainer
          //   @ts-ignore
          center={storeLocation}
          zoom={14}
          style={{ height:  "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <Marker
            position={location}
            //   @ts-ignore
            icon={markerIcon}
          >
            <div>Locked Location</div>
          </Marker> */}
          <Marker position={storeLocation} icon={markerIcon}>
        <Popup>
          Store Location
        </Popup>
      </Marker>
      <Marker position={previousCaravanLocation} icon={markerIcon}>
        <Popup>
          Previous Caravan Location
        </Popup>
      </Marker>
      <Marker position={currentCravanLocation} icon={markerIcon}>
        <Popup>
          Current Caravan Location
        </Popup>
      </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default GoogleMap;
