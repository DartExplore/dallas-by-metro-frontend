import { useState } from "react";
import { FilterContext, UserContext } from "../ClientContext/ClientContext";
import "./Planner.css";

import Places from "../Places/Places";
import PlacesFilter from "../PlacesFilter/PlacesFilter";
import "../../css-reset.css";

const Planner = () => {
  const [filter, setFilter] = useState({
    currentStation: -1,
    maxStationConnections: 1,
    maxTransfers: 0,
    amenityIds: "",
    types: "",
    maxWalkTime: 15,
    returnStationsWithNoPOIs: false,
  });

  const [user, setUser] = useState({
    currentStationName: "",
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <UserContext.Provider value={{ user, setUser }}>
        <main className="planner">
          <div className="planner-container">
            <header>
              <h1>DARTable places</h1>
            </header>
            <div className="planner-view">
              <PlacesFilter />
              <Places />
            </div>
          </div>
        </main>
      </UserContext.Provider>
    </FilterContext.Provider>
  );
};

export default Planner;
