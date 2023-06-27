import Amenity from "./Amenity";

interface PointOfInterest {
  poiId: number;
  name: string;
  location: string;
  walkingDistance: number;
  picUrl: string;
  type: string;
  amenities: Amenity[];
  stationId: number;
  stationName: string;
}

export default PointOfInterest;
