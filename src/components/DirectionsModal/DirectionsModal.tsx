import React from "react";

import "./DirectionsModal.css";

interface DirectionsModalProps {
  show: boolean;
  onClose: () => void;
  placeName: string;
  stationName: string;
}

const DirectionsModal: React.FC<DirectionsModalProps> = ({
  show,
  onClose,
  placeName,
  stationName,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const buildGoogleMapsUrl = (station: string, place: string) => {
    const encodedStation = encodeURIComponent(station);
    const encodedPlace = encodeURIComponent(place);
    return `https://www.google.com/maps/dir/${encodedStation}/${encodedPlace}`;
  };

  if (!show) return null;

  const googleMapsUrl = buildGoogleMapsUrl(stationName, placeName);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Directions to {placeName}</h2>
        <p>
          Here are the directions to {placeName} from {stationName}...
        </p>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DirectionsModal;
