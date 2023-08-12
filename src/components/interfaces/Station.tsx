import PointOfInterest from "./PointOfInterest";

interface Station {
  stationId: number;
  name: string;
  color: string;
  pointsOfInterest: PointOfInterest[];
}

export default Station;
