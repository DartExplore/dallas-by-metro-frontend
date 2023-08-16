import PointOfInterest from "./PointOfInterest";

interface Station {
  stationId: number;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
  pointsOfInterest: PointOfInterest[];
}

export default Station;
