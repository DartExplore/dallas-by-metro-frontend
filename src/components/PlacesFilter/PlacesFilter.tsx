import { useState, useContext, useEffect } from "react";
import { FilterContext, UserContext } from "../ClientContext/ClientContext";
import Station from "../interfaces/Station";
import Amenity from "../interfaces/Amenity";
import NearestStationSetter from "../NearestStationSetter/NearestStationSetter";
import DBMClient from "../../client";
import "./PlacesFilter.css";

const API_URL: string = import.meta.env.VITE_API_URL;

const client = new DBMClient(API_URL);

const PlacesFilter = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const [formState, setFormState] = useState(filter);
  const [stations, setStations] = useState<Station[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectAllTypes, setSelectAllTypes] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getAllStationsWithPOIs();
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Unknown error");
        }
        const data = await response.json();
        setStations(data);

        const amenitiesResponse = await client.getAllAmenities();
        if (!amenitiesResponse.ok) {
          const errorData = await amenitiesResponse.json();
          throw new Error(errorData.message || "Unknown error");
        }
        const amenitiesData = await amenitiesResponse.json();
        setAmenities(amenitiesData);

        const typesResponse = await client.getAllTypes();
        if (!typesResponse.ok) {
          const errorData = await typesResponse.json();
          throw new Error(errorData.message || "Unknown error");
        }
        const typesData = await typesResponse.json();
        setTypes(typesData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFilter(formState);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    let newValue: string | number | boolean =
      type === "checkbox" ? checked : value;

    if (name === "currentStation") {
      newValue = parseInt(value, 10);

      // Set currentStationName based on the selected stationId
      const selectedStation = stations.find(
        (station) => station.stationId === newValue
      );
      setUser({
        ...user,
        currentStationName: selectedStation ? selectedStation.name : "",
      });
    }

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    // Convert the string into an array
    let currentAmenityIds = formState.amenityIds
      .split(",")
      .filter(Boolean)
      .map((id) => id.trim());

    if (checked && !currentAmenityIds.includes(value)) {
      currentAmenityIds.push(value);
    } else if (!checked) {
      currentAmenityIds = currentAmenityIds.filter((id) => id !== value);
    }
    setFormState({
      ...formState,
      amenityIds: currentAmenityIds.join(","),
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (!checked) {
      setSelectAllTypes(false);
    }
    // Convert the string into an array
    let currentTypes = formState.types
      .split(",")
      .filter(Boolean)
      .map((type) => type.trim());

    if (checked && !currentTypes.includes(value)) {
      currentTypes.push(value);
    } else if (!checked) {
      currentTypes = currentTypes.filter((type) => type !== value);
    }
    setFormState({
      ...formState,
      types: currentTypes.join(","),
    });
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleSelectAllTypesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setSelectAllTypes(checked);
    const allTypes = types.join(",");
    setFormState({
      ...formState,
      types: checked ? allTypes : "",
    });
  };

  return (
    <div className="places-filter">
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="filter-group filter-split">
          <label htmlFor="currentStation">Current Station</label>
          <div>
            <select
              name="currentStation"
              value={formState.currentStation}
              onChange={handleInputChange}
            >
              <option value={-1}>Anywhere</option>
              {stations.map((station) => (
                <option key={station.stationId} value={station.stationId}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>
          <NearestStationSetter
            stations={stations}
            onNearestStationFound={(stationId) =>
              setFormState({ ...formState, currentStation: stationId })
            }
          />
        </div>
        <div className="filter-group filter-split">
          <label htmlFor="maxStationConnections">Max Connections</label>
          <input
            type="number"
            name="maxStationConnections"
            value={formState.maxStationConnections}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-group filter-split">
          <label htmlFor="maxTransfers">Max Transfers</label>
          <input
            type="number"
            name="maxTransfers"
            value={formState.maxTransfers}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-group">
          <label>Types</label>
          <div className="filter-split">
            <div>
              <label>
                <input
                  type="checkbox"
                  name="selectAllTypes"
                  checked={selectAllTypes}
                  onChange={handleSelectAllTypesChange}
                />
                Select All
              </label>
            </div>
            {types.map((type, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    name="types"
                    value={type}
                    checked={formState.types
                      .split(",")
                      .map((t) => t.trim())
                      .includes(type)}
                    onChange={handleTypeChange}
                  />
                  {capitalizeFirstLetter(type.replace(/_/g, " "))}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Amenities</label>
          <div className="filter-split">
            {amenities.map((amenity) => (
              <div key={amenity.amenityId}>
                <label>
                  <input
                    type="checkbox"
                    name="amenityIds"
                    value={amenity.amenityId}
                    checked={formState.amenityIds
                      .split(",")
                      .map((id) => id.trim())
                      .includes(amenity.amenityId.toString())}
                    onChange={handleAmenityChange}
                  />
                  {capitalizeFirstLetter(amenity.amenity.replace(/_/g, " "))}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-group filter-split">
          <label htmlFor="maxWalkTime">Max Walk Time</label>
          <input
            type="number"
            name="maxWalkTime"
            value={formState.maxWalkTime}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default PlacesFilter;
