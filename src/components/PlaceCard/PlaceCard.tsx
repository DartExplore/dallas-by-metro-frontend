import "./PlaceCard.css";

interface PlaceCardProps {
  key: number;
  placeName: string;
  emoji: string;
  stationName: string;
  title: string;
  onPlaceClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  placeName,
  onPlaceClick,
  emoji,
  stationName,
  title,
}) => {
  return (
    <div className="place-card" onClick={onPlaceClick}>
      <div className="name" title={title}>
        {placeName}
      </div>
      <div className="emoji">{emoji}</div>
      <p className="station-name">{stationName}</p>
    </div>
  );
};

export default PlaceCard;
