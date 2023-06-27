import "./Station.scss";
import PointOfInterest from "../interfaces/PointOfInterest";
import PointOfInterestCard from "../PointOfInterestCard/PointOfInterestCard";

interface StationProps {
  stationName: string;
  pointOfInterestList: PointOfInterest[];
}

function Station({ stationName, pointOfInterestList }: StationProps) {
  return (
    <>
      {pointOfInterestList.length ? (
        <div className="station-container">
          <h2>{stationName}</h2>
          {pointOfInterestList.map((p, index) => (
            <PointOfInterestCard pointOfInterest={p} id={index} key={index} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Station;
