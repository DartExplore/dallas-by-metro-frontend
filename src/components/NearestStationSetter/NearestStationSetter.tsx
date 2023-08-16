import React, { useState } from "react";
import Station from "../interfaces/Station";

import "./NearestStationSetter.css";

type NearestStationSetterProps = {
  stations: Station[];
  onNearestStationFound: (stationId: number) => void;
};

const NearestStationSetter: React.FC<NearestStationSetterProps> = ({
  stations,
  onNearestStationFound,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const findNearestStation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        let nearestStation: Station | null = null;
        let minDistance = Number.MAX_VALUE;

        stations.forEach((station) => {
          const distance = getDistanceFromLatLonInKm(
            lat,
            lng,
            station.latitude,
            station.longitude
          );

          if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station;
          }
        });

        if (nearestStation) {
          onNearestStationFound((nearestStation as Station).stationId);
        }

        setIsLoading(false);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <div className="station-finder-container">
      <button
        className="station-finder"
        onClick={findNearestStation}
        title="Find my nearest station for me"
        disabled={isLoading}
      >
        Find closest
      </button>
      {isLoading && <div className="loader">Loading...</div>}
    </div>
  );
};

export default NearestStationSetter;
