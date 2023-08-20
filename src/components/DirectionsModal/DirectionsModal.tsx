import React from "react";

import "./DirectionsModal.css";

interface DirectionsModalProps {
  show: boolean;
  onClose: () => void;
  placeName: string;
  stationName: string;
  currentStationName?: string;
}

const DirectionsModal: React.FC<DirectionsModalProps> = ({
  show,
  onClose,
  placeName,
  stationName,
  currentStationName,
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
  const currentGoogleMapsUrl = currentStationName
    ? buildGoogleMapsUrl(currentStationName, placeName)
    : null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Directions to {placeName}</h2>
        {currentGoogleMapsUrl && (
          <div>
            <a
              href={currentGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google maps from current station
            </a>
          </div>
        )}
        <div>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Google maps from final station
          </a>
        </div>
        <div>
          <p>
            Information about&nbsp;
            <a
              href="https://www.dart.org/fare/general-fares-and-overview/fares#fareoptions"
              target="_blank"
              rel="noopener noreferrer"
            >
              purchasing station tickets
            </a>
          </p>
        </div>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DirectionsModal;
