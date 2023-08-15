class DBMClient {
  apiURL: string;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  getAllTypes() {
    return fetch(`${this.apiURL}/api/public/type`);
  }

  getStationsByConnection(
    currentStation?: number,
    maxStationConnections?: number,
    maxTransfers?: number,
    amenityIds?: string,
    types?: string,
    maxWalkTime?: number,
    returnStationsWithNoPOIs = false
  ) {
    const url = new URL(`${this.apiURL}/api/public/stations`);

    if (currentStation) {
      url.searchParams.append("currentStation", currentStation.toString());
    }

    if (maxStationConnections) {
      url.searchParams.append(
        "maxStationConnections",
        maxStationConnections.toString()
      );
    }

    if (maxTransfers) {
      url.searchParams.append("maxTransfers", maxTransfers.toString());
    }

    if (amenityIds) {
      url.searchParams.append("amenityIds", amenityIds);
    }

    if (types) {
      url.searchParams.append("types", types);
    }

    if (maxWalkTime) {
      url.searchParams.append("maxWalkTime", maxWalkTime.toString());
    }

    url.searchParams.append(
      "returnStationsWithNoPOIs",
      returnStationsWithNoPOIs.toString()
    );

    console.log(url.toString());

    return fetch(url.toString());
  }

  getPOIsById(ID: string) {
    const url = new URL(`${this.apiURL}/api/public/poi`);
    url.searchParams.append("ID", ID);
    return fetch(url.toString());
  }

  getPOIsAtStation(stationId: number, amenityIdList: string) {
    const url = new URL(`${this.apiURL}/api/public/poi/${stationId}/amenity`);
    url.searchParams.append("amenityIdList", amenityIdList);
    return fetch(url.toString());
  }

  getPOIs(amenityIdList: string) {
    const url = new URL(`${this.apiURL}/api/public/poi/amenity`);
    url.searchParams.append("amenityIdList", amenityIdList);
    return fetch(url.toString());
  }

  getStationsByLines(line: string) {
    const url = new URL(`${this.apiURL}/api/public/line`);
    url.searchParams.append("line", line);
    return fetch(url.toString());
  }

  getAllAmenities() {
    return fetch(`${this.apiURL}/api/public/amenities`);
  }

  getAllStationsWithPOIs() {
    return fetch(`${this.apiURL}/api/public/all`);
  }
}

export default DBMClient;
