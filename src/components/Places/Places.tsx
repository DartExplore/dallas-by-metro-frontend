import { useState, useEffect, useContext } from "react";
import {
  FilterContext,
  ClientContext,
  UserContext,
} from "../ClientContext/ClientContext";
import PlaceCard from "../PlaceCard/PlaceCard";
import PointOfInterest from "../interfaces/PointOfInterest";
import Station from "../interfaces/Station";
import DirectionsModal from "../DirectionsModal/DirectionsModal";

import "./Places.css";

type ErrorType = string | { errorMessage: string };

const Places = () => {
  const [data, setData] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const { filter } = useContext(FilterContext);
  const { client } = useContext(ClientContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const [selectedStationName, setSelectedStationName] = useState("");
  const { user } = useContext(UserContext);

  const handlePlaceClick = (placeName: string, stationName: string) => {
    setSelectedPlaceName(placeName);
    setSelectedStationName(stationName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaceName("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const currentStationValue =
          filter.currentStation === -1 ? undefined : filter.currentStation;
        const maxStationConnectionsValue = currentStationValue
          ? filter.maxStationConnections
          : undefined;

        const response = await client.getStationsByConnection(
          currentStationValue,
          maxStationConnectionsValue,
          filter.maxTransfers,
          filter.amenityIds,
          filter.types,
          filter.maxWalkTime,
          filter.returnStationsWithNoPOIs
        );

        const data = await response.json();
        if (!response.ok) {
          throw data.errorMessage || "Unknown error";
        }
        setData(data);
      } catch (error) {
        console.error(error);
        setError(
          typeof error === "string" ? error : { errorMessage: "Unknown error" }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter, client]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = typeof error === "string" ? error : error.errorMessage;
    return <div>Error loading data: {errorMessage}</div>;
  }

  const emojiMap: { [key: string]: string } = {
    BAR: "🍻",
    RESTAURANT: "🍴",
    COFFEE_SHOP: "☕",
    OTHER: "✨",
  };

  const getEmojiByType = (type: string): string => {
    return emojiMap[type] || "❓"; // returns a question mark if the type isn't found
  };

  return (
    <div className="places">
      {data.map((station) =>
        station.pointsOfInterest.map((poi: PointOfInterest) => (
          <PlaceCard
            key={poi.poiId}
            placeName={poi.name}
            onPlaceClick={() => handlePlaceClick(poi.name, station.name)}
            emoji={getEmojiByType(poi.type)}
            stationName={station.name}
            title={poi.name}
          />
        ))
      )}
      <DirectionsModal
        show={isModalOpen}
        onClose={handleCloseModal}
        placeName={selectedPlaceName}
        stationName={selectedStationName}
        currentStationName={user.currentStationName}
      />
    </div>
  );
};

export default Places;
